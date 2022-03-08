export const paginateResponse = (data: any, page: any, limit: any) => {
	const [result, total] = data;
	const lastPage = Math.ceil(total / Number(limit));
	const nextPage = Number(page) + 1 > lastPage ? null : Number(page) + 1;
	const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;
	return {
		data: [...result],
		count: total,
		perPage: Number(limit),
		currentPage: Number(page),
		nextPage: nextPage,
		prevPage: prevPage,
		lastPage: lastPage,
	};
};
