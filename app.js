import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import adminRouter from "./routes/admin.js";
import usersRouter from "./routes/users.js";
// import session from "express-session";
// import { default as connectMongoDBSession } from "connect-mongodb-session";
import "dotenv/config";
import cors from "cors";
import Dbconfig from "./Config/Dbcofig.js";

const app = express();
// const MongoDBStore = connectMongoDBSession(session);
// const store = new MongoDBStore({
// 	uri: process.env.MONGO_URL,
// 	collection: "sessions",
// });

// app.set("proxy", 1);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
// app.use(
// 	session({
// 		secret: process.env.TOKEN_KEY,
// 		resave: false,
// 		saveUninitialized: false,
// 		cookie: { secure: false },
// 		store: store,
// 	})
// );
//! cors

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
		allowedHeaders: [
			"Access-Control-Allow-Origin",
			"Content-Type",
			"Authorization",
		],
	})
);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods","GET", "POST", "PUT", "DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/v1/admin", adminRouter);
app.use("/v1/users", usersRouter);

/** default engine */
app.get("/", (req, res) => res.send(`<span><h4>Hello World!<h4/><span/>`));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(process.env.PORT || 8000, () =>
	console.log(`app listening on port ${process.env.PORT}!`)
);

export default app;
