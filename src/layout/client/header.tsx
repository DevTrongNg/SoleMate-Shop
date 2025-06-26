import React from 'react'

const ClientHeader = () => {
  return (
     <header>
        <div className="w-full mx-auto  bg-gradient-to-r from-[#4E7C32] to-[#b7a7a7] py-[5px] text-white">
          <div className="container max-w-[1200px] mx-auto">
            <div className="top max-w-[1440px] flex items-center justify-around border-b-[1px] border-white py-[10px]">
              <div className="w-[550px] h-full flex items-center text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 relative left-[510px] text-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  className="w-full max-w-[525px] max-h-[43px] p-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Suchen Sie nach Produkten, Marken und mehr"
                />
                {/* <input type="text" className="w-full max-w-[525px] max-h-[43px] p-2 border border-gray-300 rounded-md outline-none" placeholder="Suchen Sie nach Produkten, Marken und mehr"> */}
              </div>
              <h4>En</h4>
              <div className="icon flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <h4>
                  {" "}
                  <a href="/register"> Account</a>{" "}
                </h4>
              </div>
              <div className="icon flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <h4>Cart</h4>
              </div>
            </div>
            <div className="flex justify-around py-[5px] text-white">
              <h4>
                <div>
                  {/* <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="bg-transparent border-none outline-none text-white w-28"
                  >
                    <option value="" className="text-white">
                      Beleuchtung
                    </option>
                    {categorie.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="text-black"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select> */}
                </div>
              </h4>

              <h4>Growbox</h4>
              <h4>Dünger</h4>
              <h4>Erde & Substrate</h4>
              <h4>Töpfe & Behälter</h4>
              <h4>Bewässerung</h4>
              <h4>Pflanzen & Gärtnern</h4>
              <h4>Lüftung & Klimaanlage</h4>
            </div>
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-[#B5DCB0] to-[#F9F3EE]">
          <div className="container w-[1200px] h-[597px] mx-auto bg-[url('/img/1.png')] bg-auto flex items-center px-10">
            <div className="w-[650px] h-[300px]">
              <h2 className="font-baloo text-[#505F4E] text-[55px] font-bold no-underline leading-[1.2]">
                Wir kümmern uns um Ihre <br /> schöner Garten und Haus
              </h2>
              <p className="w-[500px] font-poppins text-[15px] text-[#665345] my-[10px] leading-[1.5]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <button className="border-2 border-[#505F4E] px-5 py-2 my-[10px] font-poppins text-[15px] text-[#665345] hover:bg-[#505F4E] hover:text-white transition-all">
                Lern mehr
              </button>
            </div>
          </div>
        </div>
        
      </header>
  )
}

export default ClientHeader