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

## Frontend Side

-   npx create-react-app frontend
-   npm i react-router-dom axios bulma 
- Membuat folder untuk menampilkan di website :
            -> components : folder untuk menyimpan semua component atau kebutuhan (CRUD)
            -> App.js : file untuk memanggil perintah yang telah dibuat (components -> App.js)
            -> index.js     : file untuk memanggil semua routes yang telah dibuat (components -> App.js -> index.js)
            

