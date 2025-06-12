/**
 {
    'id': 56884,
    'width': 3888,
    'height': 2592,
    'url': 'https://www.pexels.com/photo/woman-relaxing-relax-spa-56884/',
    'photographer': 'Pixabay',
    'photographer_url': 'https://www.pexels.com/@pixabay',
    'src': {
},
 */

export class PexelImg {

    public id: number;
    public src: PexelImgSrc;
    public width: number;
    public height: number;

    constructor() {
    }
}

/**
 'original': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg',
 'large2x': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
 'large': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
 'medium': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&h=350',
 'small': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&h=130',
 'portrait': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
 'square': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=1200&w=1200',
 'landscape': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
 'tiny': 'https://images.pexels.com/photos/56884/wellness-massage-relax-relaxing-56884.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280'
 */
export class PexelImgSrc {
    public medium: string;
    public small: string;
    public portrait: string;

    constructor() {
    }
}
