## Backend Side

-   npm init -y     : Install depedency noded
-   npm i express-fileupload mysql2 sequelize cors argon2 dotenv express-session : Install module (image by file-upload express not multer)
-   menambakan "type" : "module" supaya dapat menggunakkn esx syntax (jsx) 
-   Membuat folder untuk sequeliz :
            -> conbfig : folder yang berisi file (database.js) untuk menghubungkan ke database
            -> controller : folder untuk melakukan sebuah perintah terhdapat suatu kondisi (CRUD)
            -> Models : Folder untuk menyimpoan data (field) tabel database
            -> Routes : Folder untuk memanggil perintah yang telah dibuat (controller -> routes)
            -> index.js : file untuk memanggil semua routes yang telah dibuat (constoller -> routes -> index.js)
-   npm i connect-session-sequalize : Menyimpoan session ke database sehingga server restart kita dalam kondisi kogin sampai kita lpgout 

## Frontend Side with redux

-   npx create-react-app frontend
-   npm i react-router-dom axios bulma 
- Membuat folder untuk menampilkan di website :
            -> app : folder untuk menyimpan setting app
                        -> store.js : file untuk menyimpanPenyimpanan menyimpan seluruh state tree aplikasi Anda. Satu-satunya cara untuk mengubah keadaan di dalamnya adalah dengan mengirimkan(dispatch) tindakan(action) terhadapnya. store bukanlah class. Itu hanya objek dengan beberapa metode di atasnya. Untuk membuatnya, teruskan root reducing function Anda ke createStore
                        -> https://redux.js.org/api/store/

            -> components : folder untuk menyimpan semua component atau kebutuhan (form, list, navbar dll)
            -> fetaures : Folder untuk menyimpan auth dengan menggunakan redux-toolkit
            -> pages : folder yang digunakan unutk menampilkan halam ke UI
            -> App.js : file untuk memanggil perintah yang telah dibuat (components -> App.js)
            -> index.js     : file untuk memanggil semua routes yang telah dibuat (components -> App.js -> index.js)


### `Tanpa Redux`
        app
c1                  c2
c2 butuh komponent c1 maka melakjukan fungsi dari c1 ke app lalau mengirim prop ke c2 (dapat acc)

### `Dengan Redux`
        app                      store
c1                  c2
c2 butuh kompnent pada c1 maka ia akan langsung mengakses store tanpa melalu function dan prop


### `Redux`
-   Redux adalah sebuah library JavaScript yang dapat digunakan untuk mengelola state dan data dalam aplikasi. 
-   Redux digunakan untuk memperjelas bagaimana data dan state diakses, dimanipulasi, dan disimpan pada aplikasi. 
-   Library ini berfungsi sebagai tempat penyimpanan data dan state, sehingga memudahkan dalam memanajemen data dan state yang kompleks.
-   library ini membantu mempercepat proses debugging pada aplikasi.

### `Redux Toolkit`
-   Redux toolkit merupakan package yang dikembangkan dan menjadi cara standasr baru untuk menulis kode redux untuk mengangani tiga masalah utama redux
        -> Mengkonfigurasi redux sotre yanf terlalu rumit
        ->  haru smenambhakan banyuak poackage untuk membuiat redux melakukan sesuatu yang berguna
        -> redux membutuh kan terlalalu banyak boilerplate code

### `Store`
-   Store merupakan tempat penyimpanan data dan state pada Redux. Pada store, state dan data diorganisir ke dalam tree yang terstruktur. 
-   Dengan menggunakan store, aplikasi dapat mengakses data dan state dengan mudah dari mana saja di aplikasi.

### `Action dan Reducer `
-   Action adalah sebuah objek yang berisi informasi tentang perubahan yang akan dilakukan pada store. 
-   reducer adalah sebuah fungsi yang akan memproses action dan merubah state pada store. 
-   Dengan mengkombinasikan action dan reducer, Redux dapat melakukan proses pengelolaan data dan state dengan mudah dan terstruktur.

## CARA KERJA
    Instalasi -> Store -> Action -> Menghubungkan store dengan components
->  install : yarn add react-redux 
->  Store   : Store pada library ini berfungsi sebagai tempat penyimpanan state dan data pada aplikasi. Untuk membuat store, diperlukan reducer dan initial state.
->  Action  : Action pada library ini adalah objek yang berisi informasi tentang perubahan yang akan dilakukan pada store. Action dapat digunakan untuk melakukan perubahan pada state pada store.
->  Reducer : Reducer pada library ini berfungsi untuk memproses action dan merubah state pada store. Reducer didefinisikan sebagai sebuah fungsi yang menerima state dan action sebagai parameter, dan mengembalikan state yang baru.
-> components : Untuk menghubungkan store dengan komponen React Native, dapat digunakan fungsi connect pada library react-redux. Dengan menghubungkan store dengan komponen React Native, state pada store dapat diakses dan digunakan pada komponen React Native.







