const slideData = [
{
  index: 0,
  headline: '至上官网首页',
  button: 'Shop now',
  src: 'images/zs/1.png' },

{
  index: 1,
  headline: '至上官网菜单',
  button: 'Shop now',
  src: 'images/zs/2.png' },

{
  index: 2,
  headline: '至上官网内部一角',
  button: 'Shop now',
  src: 'images/zs/3.png' },

{
  index: 3,
  headline: '至上后台管理',
  button: 'Shop now',
  src: 'images/zs/4.png' },

{
	index: 4,
	headline: '至上后台管理菜单',
	button: 'Shop now',
	src: 'images/zs/5.png' },

{
	index: 5,
	headline: '至上后台图文管理',
	button: 'Shop now',
	src: 'images/zs/6.png' },
{
	index: 6,
	headline: '至上后台案例管理',
	button: 'Shop now',
	src: 'images/zs/7.png' },
{
	index: 7,
	headline: '至上后台证书管理',
	button: 'Shop now',
	src: 'images/zs/8.png' }
  ];





/*const slideData = [
{
  index: 0,
  headline: 'New Fashion Apparel',
  button: 'Shop now',
  src: 'img/fashion.jpg' },

{
  index: 1,
  headline: 'In The Wilderness',
  button: 'Book travel',
  src: 'img/forest.jpg' },

{
  index: 2,
  headline: 'For Your Current Mood',
  button: 'Listen',
  src: 'img/guitar.jpg' },

{
  index: 3,
  headline: 'Focus On The Writing',
  button: 'Get Focused',
  src: 'img/typewriter.jpg' }];*/




// =========================
// Slide
// =========================

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = 'slide';

    if (current === index) classNames += ' slide--current';else
    if (current - 1 === index) classNames += ' slide--previous';else
    if (current + 1 === index) classNames += ' slide--next';

    return (
      React.createElement("li", {
        ref: this.slide,
        className: classNames,
        onClick: this.handleSlideClick,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave },

      React.createElement("div", { className: "slide__image-wrapper" },
      React.createElement("img", {
        className: "slide__image",
        alt: headline,
        src: src,
        onLoad: this.imageLoaded })),



      React.createElement("article", { className: "slide__content" },
      React.createElement("h2", { className: "slide__headline" }, headline))));
//      React.createElement("button", { className: "slide__action btn" }, button))));



  }}



// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return (
    React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick },
    React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" },
    React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));



};


// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ?
      this.props.slides.length - 1 :
      previous });

  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ?
      0 :
      next });

  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index });

    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)` };


    return (
      React.createElement("div", { className: "slider", "aria-labelledby": headingId },
      React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform },
      React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),

      slides.map(slide => {
        return (
          React.createElement(Slide, {
            key: slide.index,
            slide: slide,
            current: current,
            handleSlideClick: this.handleSlideClick }));


      })),


      React.createElement("div", { className: "slider__controls" },
      React.createElement(SliderControl, {
        type: "previous",
        title: "Go to previous slide",
        handleClick: this.handlePreviousClick }),


      React.createElement(SliderControl, {
        type: "next",
        title: "Go to next slide",
        handleClick: this.handleNextClick }))));




  }}



ReactDOM.render(React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));