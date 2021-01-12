import React from 'react';

const Node = React.forwardRef(({ label, ...props }, ref) => {
	return (
		<div
			ref={ref}
			{...props}
			style={{
				...props.style,
				backgroundColor: 'yellow',
				width: 100,
				height: 50,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div>{label}</div>
		</div>
	);
});

export default Node;
