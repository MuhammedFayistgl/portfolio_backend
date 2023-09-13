export const getalluserData = (req, res) => {
	return res.json({
		name: "fayis",
		message: "data feche succussfully",
		userId: req.userId,
	});
};
