const listHelper = require("../utils/list_helper");
const {listWithOneBlog, listWithSixBlogs} = require("./test_helper.js");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has multiple blogs, equals to the sum of the likes", () => {
		const result = listHelper.totalLikes(listWithSixBlogs);
		expect(result).toBe(36);
	});

	test("when no blog is in the list, the total likes is 0", () => {
		const result = listHelper.totalLikes([]);
		expect(result).toBe(0);
	});
});

describe("favorite blog", () => {
	test("favorite blog returns the blog with the most likes", () => {
		const result = listHelper.favoriteBlog(listWithSixBlogs);
		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		});
	});
});

describe("most blogs", () => {
	test("most blogs returns the name and the count of the blogger with mosts blogs", () => {
		const result = listHelper.mostBlogs(listWithSixBlogs);

		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3
		});
	});
	test("most blogs with an empty list returns null", () => {
		const result = listHelper.mostBlogs([]);
		expect(result).toBe(null);
	});
});

describe("most likes", () => {
	test("most likes returns the name and the total likes of the blogger with most likes", () => {
		const result = listHelper.mostLikes(listWithSixBlogs);

		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17
		});
	});
	test("most likes with an empty list returns null", () => {
		const result = listHelper.mostLikes([]);
		expect(result).toBe(null);
	});
});