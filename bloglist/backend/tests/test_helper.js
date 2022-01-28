const User = require("../models/user");

const initialUsers = [
	{
		_id: "5a442aa71b54a676234d17f8",
		username: "root",
		name: "Root",
		passwordHash: "$2y$10$3Vq5JQC7uQxSsX2wIXo5c.BimKa8uhqoJPIe2I7qPoPBcu2lgoF5u",
		__v: 0,
	}
];

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
		user: initialUsers[0]._id,
	}
];

const listWithSixBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
		user: initialUsers[0]._id,
	}, {
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
		user: initialUsers[0]._id,
	}, {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
		user: initialUsers[0]._id,
	}, {
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
		user: initialUsers[0]._id,
	}, {
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
		user: initialUsers[0]._id,
	}, {
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
		user: initialUsers[0]._id,
	}
];

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
}

module.exports = {
	initialUsers,
	listWithOneBlog,
	listWithSixBlogs,
	usersInDb,
};