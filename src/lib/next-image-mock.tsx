import React from 'react';

const Image = ({ src, alt, fill, className, priority, ...props }: any) => {
    const style = fill ? {
        position: 'absolute' as const,
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: props.objectFit as any,
    } : {};

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            loading={priority ? 'eager' : 'lazy'}
            {...props}
        />
    );
};

export default Image;
