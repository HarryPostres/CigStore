const theme = {
    colors:{
        red: '#ff0000ff',
        white: '#f7f8f9',
        
        gray: '#424042',
        background : '#fdfce8',
        pink: '#f8b3bf',

        black: '#000000',
    },
    textures: {
        gold: require('../assets/textures/gold-texture.jpg'),
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl:40,
    },
    sizes: {
        radiusSm: 8,
        radiusMd: 16,
        radiusLg: 24,

        iconSm: 16,
        iconMd: 24,
        iconLg: 32,
    },
    typography:{
        fontSize:{
            xs:12,
            sm:14,
            md:16,
            lg:20,
            xl:24,
        },
        fontFamily:{
            regular: 'Arial',
            bold: 'system font bold',
        },
    },
};

export default theme;