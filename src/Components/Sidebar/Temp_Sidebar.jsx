import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const TempSidebar = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FontAwesomeIcon icon={faGear} size="3x" className="text-gray-600" />
    </div>
  );
}
export default TempSidebar;
