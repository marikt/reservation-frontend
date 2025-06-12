/**
 * Model for Pexel video API response
 * 
 * This class represents a video from the Pexels API.
 * It contains information about the video, including its ID, dimensions, URL, and more.
 * It also contains arrays of video files and video pictures.
 */
export class PexelVideo {
  /** The unique identifier of the video */
  public id: number;
  
  /** The width of the video in pixels */
  public width: number;
  
  /** The height of the video in pixels */
  public height: number;
  
  /** The URL to the Pexels page of the video */
  public url: string;
  
  /** The URL to the video's thumbnail image */
  public image: string;
  
  /** The duration of the video in seconds */
  public duration: number;
  
  /** Information about the user who uploaded the video */
  public user: {
    id: number;
    name: string;
    url: string;
  };
  
  /** Array of different video file formats and qualities */
  public video_files: PexelVideoFile[];
  
  /** Array of preview pictures for the video */
  public video_pictures: PexelVideoPicture[];

  constructor() {
  }
}

/**
 * Represents a specific video file format and quality
 */
export class PexelVideoFile {
  /** The unique identifier of the video file */
  public id: number;
  
  /** The quality of the video (e.g., 'hd', 'sd') */
  public quality: string;
  
  /** The file type (e.g., 'video/mp4') */
  public file_type: string;
  
  /** The width of the video file in pixels */
  public width: number;
  
  /** The height of the video file in pixels */
  public height: number;
  
  /** The URL to the video file */
  public link: string;

  constructor() {
  }
}

/**
 * Represents a preview picture for a video
 */
export class PexelVideoPicture {
  /** The unique identifier of the picture */
  public id: number;
  
  /** The URL to the picture */
  public picture: string;
  
  /** The picture number/index */
  public nr: number;

  constructor() {
  }
}