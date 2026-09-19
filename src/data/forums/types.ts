export type ForumReply = {
	author: string;
	date: string;
	body: string;
};

export type ForumSection = {
	h2: string;
	paragraphs: string[];
};

export type ForumThread = {
	id: string;
	slug: string;
	category: string;
	title: string;
	metaTitle: string;
	metaDescription: string;
	published: string;
	updated: string;
	imageSrc: string;
	imageAlt: string;
	intro: string;
	sections: ForumSection[];
	replies: ForumReply[];
};
