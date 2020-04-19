var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student'
});

con.connect((err) => {
    //if (err) throw err;
    console.log("Connected!"+err);

    var query = "Insert into student_table values(0, 'anand', 'mahavir enclave', '9210363639')";
    con.query(query, (err, result)=>{
        if(err) throw err;
        console.log(result);
    })
});