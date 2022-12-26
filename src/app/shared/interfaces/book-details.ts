export interface BookDetails {
	library? :string;
	title:string;
	publish_date? : Date;
	author_name:string;
	Library?: string;
	isbn: string;
	is_availabe:boolean;
	book_addedBy:string;
}
export interface ReqBookDetails {
	useremail:string;
    title:string;
	publish_date? : Date;
	author_name:string;
	Library?: string;
	isbn: string;
	is_availabe:boolean;
	rent_duration: number;
	return_date: Date;
}