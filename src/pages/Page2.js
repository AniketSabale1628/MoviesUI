import { useEffect } from "react";
import { useState } from "react";
import vector from '../assets/Vector.svg'
import "./Page2.css";
import { useNavigate } from "react-router-dom";
const Page2 = () => {
  const data = [
    {
      id: 1,
      name: "Action",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-2.png",
      backgroundColor: "#FF5209",
      
    },
    {
      id: 2,
      name: "Drama",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-3@2x.png",
      backgroundColor: "#D7A4FF",
    },
    {
      id: 3,
      name: "Romance",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-4@2x.png",
      backgroundColor: "#148A08",
    },
    {
      id: 4,
      name: "Thriller",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-6@2x.png",
      backgroundColor: "#84C2FF",
    },
    {
      id: 5,
      name: "Western",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-7@2x.png",
      backgroundColor: "#902500",
    },
    {
      id: 6,
      name: "Horror",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-8@2x.png",
      backgroundColor: "#7358FF",
    },
    {
      id: 7,
      name: "Fantasy",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-10@2x.png",
      backgroundColor: "#FF4ADE",
    },
    {
      id: 8,
      name: "Music",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-11@2x.png",
      backgroundColor: "#E61E32",
    },
    {
      id: 9,
      name: "Fiction",
      image: "https://c.animaapp.com/NCDgkgl1/img/image-9@2x.png",
      backgroundColor: "#6CD061",
    },
  ];
  
  const Navigate=useNavigate();
  const [selectedCategories, setSelectedCategory] = useState([]);
  const [errors, setErrors] = useState("");
  const [isselectd, setIsSelect] = useState(false);

  const clickHandler = (data) => {
    setDeaultCategory(data);
    // console.log(data);

    if (!selectedCategories.includes(data)) {
      selectedCategories.push(data);
    }
    setIsSelect(true);
  };

  const clickcrosHandler = (data) => {
    const updatedCategories = [...selectedCategories];

    const index = updatedCategories.indexOf(data);

    updatedCategories.splice(index, 1);
    localStorage.setItem('selectedCategories', JSON.stringify(updatedCategories));
    setSelectedCategory(updatedCategories);

  };

  const [defaultCategory, setDeaultCategory] = useState("");
  useEffect(() => {
    if (selectedCategories.length < 4) {
      setErrors("Select at least 3 categories.");
    } else {
      setErrors("");
    }
  });

  const isCategorySelected = (data) => {
    return selectedCategories.includes(data);
  };
  function NextButtonHandler(){
    if(!errors){
      
      Navigate('/Climat')
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }
    
  }

  useEffect(() => {
    const storedSelectCategory = JSON.parse(localStorage.getItem('selectedCategories'));
    if (storedSelectCategory) {
      setSelectedCategory(storedSelectCategory);
    }
  }, []);

  return (
    <div className="All">
      <div className="title1">
        <div className="t1">Super app</div>
        <div className="t2">Choose your entertainment category</div>
        <div className="err">
          <div className="cd">
            {selectedCategories.map((data, index) => (
              <div className="categories">
                <button className="bt" key={index}>
                  {data}
                  <button
                    className="cros"
                    onClick={() => clickcrosHandler(data)}
                  >
                    X
                  </button>
                </button>
              </div>
            ))}
          
          </div>
          
        </div>
        <div className="er">{errors}</div>
      </div>

      <div className="card">
        <div className="Cards">
          {data.map((data) => (
            <button
              key={data.id}
              className={`button ${
                isCategorySelected(data.name) ? "selected" : ""
              } `}
              style={{ backgroundColor: data.backgroundColor }}
              onClick={() => clickHandler(data.name)}
            >
              <div className="title">{data.name}</div>
              <img src={data.image} className="image1"></img>
            </button>
          ))}
        </div>
      </div>

      <button className="Next_page" onClick={NextButtonHandler}>Next Page</button>
    </div>
  );
};

export default Page2;
