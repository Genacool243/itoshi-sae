const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000;
const tbl_usuariosRouter = require("./routes/tbl_usuarios");
const tbl_autosRouter = require("./routes/tbl_autos");
const tbl_cajasRouter = require("./routes/tbl_cajas");
const tbl_cajas_movRouter = require("./routes/tbl_cajas_mov");
const tbl_horariosRouter = require("./routes/tbl_horarios");
const tbl_preciosRouter = require("./routes/tbl_precios");
const tbl_registrosRouter = require("./routes/tbl_registros"); 

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Allow Cross-Origin Resource Sharing (RESTRICT LATER)
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/tbl_usuarios", tbl_usuariosRouter);
app.use("/tbl_autos", tbl_autosRouter);
app.use("/tbl_cajas", tbl_cajasRouter);
app.use("/tbl_cajas_mov", tbl_cajas_movRouter);
app.use("/tbl_horarios", tbl_horariosRouter);
app.use("/tbl_precios", tbl_preciosRouter);
app.use("/tbl_registros", tbl_registrosRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`APP listening at http://localhost:${port}`);
});
