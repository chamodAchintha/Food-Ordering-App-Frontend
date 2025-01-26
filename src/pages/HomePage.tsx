import landingImg from "../assets/landing.png";
import appDownloadImg from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/Searchbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchForm: SearchForm) => {
    navigate(`/search/${searchForm.searchQuery}`);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl ">Food is just a click away!</span>
        <SearchBar placeHolder="Search by city" onSubmit={handleSearchSubmit} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImg} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>Download the Eats App</span>
          <img src={appDownloadImg} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
