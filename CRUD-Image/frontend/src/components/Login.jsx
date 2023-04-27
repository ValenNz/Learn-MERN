/* Impoer Module  */
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice.js"; // import function store redux

const Login = () => {
  /* Membuat state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Action */
  const dispatch = useDispatch(); // pengiriman data
  const navigate = useNavigate();

  /* memanggil state pada redux store */
  const { user, isError, isSuccess, isLoading, message } = useSelector( // penggunaan state
    (state) => state.auth
  );

  /* Sleeksi Kondisi Aksi*/ 
  useEffect(() => {
    if (user || isSuccess) { // Jika user tersate (berhasil login redirect ke dashboars)
      navigate("/dashboard"); // arahkan ke dashboard
    }
    dispatch(reset()); // reser lagi state nya 
  }, [user, isSuccess, dispatch, navigate]); // depedency


  /* Fungsi Auth */
  const authUser = (e) => { // menangkap event
    e.preventDefault(); // agar ketika submite page tidak reload
    dispatch(loginUser({ email, password })); // menangkap dan mengirim dari  function store redux login -> redux sitre -> component yang butuh
  };


  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={authUser} className="box">
                {isError && <p className="has-text-centered">{message}</p>} {/* Jika error tampilkan pesan */}
                <h1 className="title is-2">Sign In</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"} {/* jika loading = true render loading jika false render logib */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;