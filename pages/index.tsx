import axios from 'axios';
import { Video } from '../type';
import VideoCard from '../components/VideoCard';
import NoResult from './../components/NoResult';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {

  return (
    <h1 className="flex flex-col cap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ): <NoResult text="No video" />}
    </h1>
  )
}

export const getServerSideProps = async ({
  query: {topic}
} : {
  query: {topic : string}
}) => {
  let response = null;
  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }


  return {      
    props: {
      videos: response.data
    }
  }
}

export default Home
