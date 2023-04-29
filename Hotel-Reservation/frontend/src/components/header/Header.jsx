/* Import Module React */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Import Module Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBowlFood,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";

/* Import Module Date */
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

/* Function Header */
const Header = ({ type }) => { // mengirimkan type kedalam function (dari halaman lain (list))

  /* Navigai */
  const navigate = useNavigate();

  /* State destination */
  const [destination, setDestination] = useState("");

  /* Membuat state date */
  const [openDate, setOpenDate] = useState(false); // menampilkan rentang tanggal (tabel)
  const [date, setDate] = useState([
    {
      startDate: new Date(), // tanggal baru
      endDate: new Date(), // tanggal baru
      key: "selection", // Dengan select user
    },
  ]);

  /* Stata */
  const [openOptions, setOpenOptions] = useState(false); // state pemilihan
  const [options, setOptions] = useState({ // state jumlah
    /* Membuat nilai default */
    adult: 1,
    children: 0,
    room: 1,
  });

  /* Fungsi action pemilihan */
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev, // previous
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1, // jika i maka minus / plus
      };
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer" // jika type list tampilkan menu 
        }
      >

        {/* Menu */}
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBowlFood} />
            <span>Food</span>
          </div>
        </div>

        {/* Search Bar */}
        {type !== "list" && ( // jika type bukan list tampilkan pemilihan
          <>
            <h1 className="headerTitle">
                Welcome to NZ Hotel
            </h1>
            <p className="headerDesc">
                Get comfortable making your reservation at Nz Hotel - let's make a reservation at Nz Hotel            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              
              {/* Pemiliohan Destinasi */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Pemilihan tanggal */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)} // setting penampilan tanggal (tabel)
                  className="headerSearchText"
                >
                  {/* Format tanggal sesuai hari ini dan kedepanya (tanggal a - tanggal b) */}
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy" )}`}
                </span>

                {/* Req tanggal (rentang) */}
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])} // set data sesuai pemilihan
                    moveRangeOnFirstSelection={false} // menghapus selection pemilihan sebelum hari sekarang
                    ranges={date} // req state 
                    className="date"
                    minDate={new Date()} // req new date
                  />
                )}
              </div>

              {/* pemilihan */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)} // tampilkan pemilihan
                  className="headerSearchText"
                >
                  {/* Pemilihan tanggal sesuai statement yang dibuat(tampilan) */}
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {/* Menampilkan pemilihan */}
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1} // tidak mengizinkan jika kurang dari 1
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}  // req adult (minus) ke state
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult} {/* Jumlah */}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")} // req adult (plus) ke state
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0} // tidak mengizinkan jika kurang dari 0
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")} // req children (minus) ke state
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children} {/* Jumlah */}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")} // req children (plus) ke state
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1} // tidak mengizinkan jika kurang dari 0
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")} // req room (minus) ke state
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room} {/* Jumlah */}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")} // req room (pluas) ke state
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Button Search */}
              <div className="headerSearchItem">
                <button className="headerBtn"> {/* req ke state */}
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;