import { PexelVideo } from './pexel-video';

/**
 * Model for Pexel videos API response
 * 
 * This class represents the response from the Pexels API when searching for videos.
 * It contains information about the search results, including pagination details and an array of videos.
 */
export class PexelVideos {
  /** The total number of videos that match the search criteria */
  public total_results: number;
  
  /** The current page number in the paginated results */
  public page: number;
  
  /** The number of videos per page */
  public per_page: number;
  
  /** Array of videos that match the search criteria */
  public videos: PexelVideo[];

  constructor() {
  }
}