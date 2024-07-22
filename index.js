import express from "express";
import { connection } from "./database.js";
const app = express();
app.use(express.json());

app.post("/students", async (req, res) => {
    await connection.execute(
        "INSERT INTO students (name, address, gender, age) VALUES (?, ?, ?, ?)",
        [req.body.name, req.body.address, req.body.gender, req.body.age]
    )

    res.send("succesfully add data students");
})

app.put("/students/:id", async (req, res) => {
    await connection.execute(
        "UPDATE students SET name = ?, address = ?, gender = ?, age = ? WHERE id = ?",
        [req.body.name, req.body.address, req.body.gender, req.body.age, req.params.id]
    );

    res.send("succesfully update data students");
})

app.get("/students", async (req, res) => {
    const result = await connection.query("SELECT * FROM students");
    res.json(result);
})

app.delete("/students/:id", async (req, res) => {
    await connection.execute(
        "DELETE FROM students WHERE id = ?",[req.params.id]
    )
    res.send("succesfully deleted data student");
})

app.listen(3000, ()=> console.log("server berjalan"));