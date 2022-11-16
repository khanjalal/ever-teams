export const ProgressTaskIcon = ({
  color = "#2dccff",
}: {
  color: string;
  background: string;
}) => {
  return (
    <svg
      className="mr-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="11"
      height="11"
    >
      <path
        fillRule="evenodd"
        fill={color}
        d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
      ></path>
    </svg>
  );
};
