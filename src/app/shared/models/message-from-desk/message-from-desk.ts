export class Image {
    name?: string;
    title?: string;
    path?: string;
  }
  
  // Header model
  export class Header {
    name?: string;
    title?: string;
    image?: Image;
  }
  
  // Body model
  export class Body {
    name?: string;
    title?: string;
    content?: string;
  }
  
  // Footer model
  export class Footer {
    name?: string;
    title?: string;
    content?: string;
    image?: Image;
  }
  
  // Main Document model
  export class MessageFromDesk {
    name?: string;
    title?: string;
    header?: Header[];
    body?: Body[];
    footer?: Footer[];
  }