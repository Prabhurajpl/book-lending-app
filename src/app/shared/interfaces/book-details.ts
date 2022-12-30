export interface BookDetails {
	library? :string;
	title:string;
	publish_date? : Date;
	author_name:string;
	isbn: string;
	status:string;
	book_addedBy:string;
	book_requestedby?:string;
	book_issuedby?:string;
	is_requested?:boolean;
	is_issuedbook?:string;
	image_url?:string;
}
