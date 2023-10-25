export const InReviewTaskIcon = ({ color = '#0a6bd9' }: { color: string; background: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13" className="mr-1">
			<path
				fillRule="evenodd"
				fill={color}
				d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
			></path>
		</svg>
	);
};
