import Image from "next/image";
import React, { useEffect, useState } from "react";
import dummy from "../../../public/assets/images/RealSales-user-images/persona-plant.png";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { SessionModesValue } from "../../redux/OpenModal";
import { useDispatch } from "react-redux";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import InfoIcon from '@mui/icons-material/Info';

const Persona = () => {
  const dispatch = useDispatch();
  const { Get, Post } = useApi();
  const { ai_personas, sessions, product_categories } = apis;

  let capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [personaData, setPersonaData] = useState([]);
  const [modeId, setModeId] = useState();
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [prods, setProds] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [plantSizeFilter, setPlantSizeFilter] = useState("");
  const [companySizeFilter, setCompanySizeFilter] = useState("");
  const [product, setProduct] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [phId, setPhId] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  console.log(
    product.filter((v) => v?.industry_id === industryId).map((val) => val),
    "indus_Val"
  );

  // Extract unique values for dropdowns
  const roles = Array.from(
    new Set(personaData.map((v) => v?.ai_role?.name).filter(Boolean))
  );
  const industries = Array.from(
    personaData
      .map((v) =>
        v?.industry && v.industry.name && v.industry.industry_id
          ? { name: v.industry.name, id: v.industry.industry_id }
          : null
      )
      .filter(Boolean)
      .reduce((acc, curr) => {
        if (!acc.has(curr.id)) acc.set(curr.id, curr);
        return acc;
      }, new Map())
      .values()
  );
  const products = Array.from(
    new Set(
      product
        .filter((v) => v?.industry_id === industryId)
        .map((val) => val)
        .map((itm) => itm?.name)
        .filter(Boolean)
    )
  );
  const models = Array.from(
    new Set(
      personaData.map((v) => v?.manufacturing_model?.name).filter(Boolean)
    )
  );
  const plantSizes = Array.from(
    new Set(personaData.map((v) => v?.plant_size_impact?.name).filter(Boolean))
  );
  const companySize = Array.from(
    new Set(personaData.map((v) => v?.company_size_new?.name).filter(Boolean))
  );

  console.log(industries, "industries");

  // Filtered data
  const filteredPersonas = personaData.filter((v) => {
    return (
      (!roleFilter || v?.ai_role?.name === roleFilter) &&
      (!industryFilter || v?.industry?.name === industryFilter) &&
      (!modelFilter || v?.manufacturing_model?.name === modelFilter) &&
      (!plantSizeFilter || v?.plant_size_impact?.name === plantSizeFilter) &&
      (!companySizeFilter || v?.company_size_new?.name === companySizeFilter) &&
      (!prods ||
        v?.persona_products?.some((val) => val?.product?.name === prods))
    );
  });

  // console.log( personaData[3], (personaData[3]?.persona_products.filter((val) => val?.product?.name === prods).map((itm)=> itm?.product?.name)), "filteredPersonas");

  const createSession = async ({ data, id }) => {
    setLoading(true);
    try {
      let sessionData = await Post(sessions, {
        mode_id: modeId,
        persona_id: id,
      });
      if (sessionData?.session_id) {
        setLoading(false);
        localStorage.setItem("session_id", sessionData?.session_id);
        localStorage.setItem("persona_data", JSON.stringify(data));
        dispatch(SessionModesValue(true));
      }
    } catch (error) {
      console.log(error, "__error__");
    } finally {
      setLoading(false);
    }
  };

  const readProduct = async () => {
    try {
      let data = await Get(product_categories);
      if (data?.length) {
        setProduct(data);
      } else {
        setProduct([]);
      }
    } catch (error) {
      setProduct([]);
      console.log(error, "_error_");
    }
  };

  const getRealAIPersona = async () => {
    try {
      let data = await Get(ai_personas);
      if (data?.length) {
        setPersonaData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRealAIPersona();
    readProduct();
    if (typeof window !== "undefined") {
      setModeId(localStorage.getItem("mode_id"));
    }
  }, []);

  // Function to check if any filter is active
  const isAnyFilterActive = () => {
    return (
      roleFilter ||
      industryFilter ||
      prods ||
      modelFilter ||
      plantSizeFilter ||
      companySizeFilter
    );
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setRoleFilter("");
    setIndustryFilter("");
    setIndustryId("");
    setProds("");
    setModelFilter("");
    setPlantSizeFilter("");
    setCompanySizeFilter("");
  };

  const PersonaCard = ({ v }) => {
    const handleCardClick = () => createSession({ data: v, id: v?.persona_id });
    return (
      <div className="relative group sm:w-[15rem] w-[48.8%] sm:h-[17rem] h-[15rem] rounded-[20px] overflow-hidden cursor-pointer shadow-[0_0_6px_0_#7e6500]">
        <div
          className="w-fit h-fit bg-[#ffde5a] p-1 rounded-xl rounded-tr-[18px] z-20 absolute top-1 right-1 sm:hidden flex"
          onClick={() => {
            if (phId === v?.persona_id) {
              setPhId("");
            } else {
              setPhId(v?.persona_id);
            }
          }}
        >
          {phId === v?.persona_id ? (
            <InfoIcon className="!fill-gray-800/80" />
          ) : (
            <InfoOutlineIcon className="!fill-gray-800"/>
          )}
        </div>
        <div
          className={`relative w-full h-full`}
          onClick={handleCardClick}
          // {...(isMobile
          //   ? { onDoubleClick: handleCardClick }
          //   : { onClick: handleCardClick })}
        >
       <Image
  src={v?.profile_pic ? v?.profile_pic : dummy}
  alt="persona"
  width={192}
  height={108}
  className="w-full h-full object-cover object-center"
/>

          {/* <div className="bg-[#ffffff] w-full h-[calc(100%_-_85%)] p-2 absolute bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <p className="m-plus-rounded-1c-semibold text-lg text-[#1a1a1a] uppercase pb-1.5">
            {v?.name?.replace(/_/g, " ")}
          </p>
        </div> */}
          <div className="absolute left-0 bottom-0 group-hover:hidden flex flex-col items-start justify-end gap-2 p-4 w-full h-3/4 rounded-b-[20px] bg-[linear-gradient(16.26deg,#000000_18.18%,rgba(0,0,0,0)_81.35%)]">
            <h1 className="text-[#FFDE5A] m-plus-rounded-1c-regular text-[20px] uppercase">
              {v?.name?.replace(/_/g, " ")}
            </h1>
            <div class="border-l-2 w-full border-solid border-[#FFDE5A80] bg-gradient-to-r from-[#FFDE5A00] to-[#FFDE5A26] px-2 py-1">
              <p class="sora-regular text-white text-[14px] capitalize">
                {capitalize(v?.ai_role?.name?.replace(/_/g, " "))}
              </p>
            </div>
          </div>
          <div
            className={`border-[#FFDE5A80] bg-gradient-to-t from-[#ffde5af5] to-[#ffde5aee] overflow-auto w-full h-[calc(100%_-_35%)] p-2 absolute top-[35%] transition-opacity duration-300 opacity-0 -z-20 ${
              phId === v?.persona_id
                ? "opacity-100 z-20"
                : "group-hover:opacity-100 group-hover:z-20"
            }`}
          >
            <p className="m-plus-rounded-1c-semibold text-lg text-[#000000] uppercase pb-1.5">
              {v?.name?.replace(/_/g, " ")}
            </p>
            <p className="font-medium m-plus-rounded-1c-bold text-[1.05rem] capitalize">
              Details:
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {capitalize(v?.ai_role?.name?.replace(/_/g, " "))}
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {capitalize(v?.industry?.name?.replace(/_/g, " "))}
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {capitalize(v?.manufacturing_model?.name?.replace(/_/g, " "))}
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {capitalize(v?.plant_size_impact?.name?.replace(/_/g, " "))}
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {capitalize(v?.company_size_new?.name?.replace(/_/g, " "))}&nbsp;
              {v?.company_size_new?.name === "small"
                ? "(1-500)"
                : v?.company_size_new?.name === "medium"
                ? "(501-5,000)"
                : v?.company_size_new?.name === "large"
                ? "(5,000+)"
                : ""}
            </p>
            <p className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]">
              <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
              {v?.geography?.replace(/_/g, " ")}
            </p>
            {v?.persona_products?.length > 0 && (
              <div className="mt-2">
                <p className="font-medium m-plus-rounded-1c-bold text-[1.05rem] capitalize">
                  Products:
                </p>
                <div className="list-disc list-inside text-[13px]">
                  {v.persona_products.map((prod, idx) => (
                    <p
                      className="flex items-start gap-2 sora-medium md:text-[14px] text-[13px]"
                      key={idx}
                    >
                      <span className="p-0.5 mt-2 rounded-full bg-[#2d2d2d]" />
                      {capitalize(prod?.product?.name?.replace(/_/g, " "))}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filterSection = (
    <div className="w-full flex flex-wrap gap-4">
      {/* Role */}
      <FormControl variant="outlined" className="sm:w-[100px] w-full">
        <InputLabel id="role-filter-label" className="!bg-transparent !px-2">
          Role
        </InputLabel>
        <Select
          labelId="role-filter-label"
          value={roleFilter}
          onChange={(e) => {
            window.scrollTo(0, 0);
            setRoleFilter(e.target.value);
          }}
          label="Role"
          className="bg-transparent"
        >
          <MenuItem value="">All Roles</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {capitalize(role?.replace(/_/g, " "))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Industries */}
      <FormControl variant="outlined" className="sm:w-[120px] w-full">
        <InputLabel
          id="industry-filter-label"
          className="!bg-transparent !px-2"
        >
          Industry
        </InputLabel>
        <Select
          labelId="industry-filter-label"
          value={industryFilter}
          onChange={(e) => {
            window.scrollTo(0, 0);
            setIndustryFilter(e.target.value);
          }}
          label="Industry"
        >
          <MenuItem value="">All Industries</MenuItem>
          {industries.map((ind) => (
            <MenuItem
              key={ind?.name}
              value={ind?.name}
              onClick={() => setIndustryId(ind?.id)}
            >
              {capitalize(ind?.name?.replace(/_/g, " "))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* products */}
      {products?.length ? (
        <FormControl variant="outlined" className="sm:w-[130px] w-full">
          <InputLabel
            id="plant-size-filter-label"
            className="!bg-transparent !px-2"
          >
            Products
          </InputLabel>
          <Select
            labelId="plant-size-filter-label"
            value={prods}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setProds(e.target.value);
            }}
            label="Products"
          >
            <MenuItem value="">All Products</MenuItem>
            {products.map((prod) => (
              <MenuItem key={prod} value={prod}>
                {capitalize(prod?.replace(/_/g, " "))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}

      {/* Plant size */}
      <FormControl variant="outlined" className="sm:w-[130px] w-full">
        <InputLabel
          id="plant-size-filter-label"
          className="!bg-transparent !px-2"
        >
          Plant Size
        </InputLabel>
        <Select
          labelId="plant-size-filter-label"
          value={plantSizeFilter}
          onChange={(e) => {
            window.scrollTo(0, 0);
            setPlantSizeFilter(e.target.value);
          }}
          label="Plant Size"
        >
          <MenuItem value="">All Plant Sizes</MenuItem>
          {plantSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {capitalize(size?.replace(/_/g, " "))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* company size */}
      <FormControl variant="outlined" className="sm:w-[170px] w-full">
        <InputLabel
          id="plant-size-filter-label"
          className="!bg-transparent !px-2"
        >
          Company Sizes
        </InputLabel>
        <Select
          labelId="plant-size-filter-label"
          value={companySizeFilter}
          onChange={(e) => {
            window.scrollTo(0, 0);
            setCompanySizeFilter(e.target.value);
          }}
          label="Plant Size"
        >
          <MenuItem value="">All Company Sizes</MenuItem>
          {companySize.map((size) => (
            <MenuItem key={size} value={size}>
              {capitalize(size?.replace(/_/g, " "))}&nbsp;
              {size === "small"
                ? "(1-500)"
                : size === "medium"
                ? "(501-5,000)"
                : size === "large"
                ? "(5,000+)"
                : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Manufacturing */}
      <FormControl variant="outlined" className="sm:w-[210px] w-full">
        <InputLabel id="model-filter-label" className="!bg-transparent !px-2">
          Manufacturing Model
        </InputLabel>
        <Select
          labelId="model-filter-label"
          value={modelFilter}
          onChange={(e) => {
            window.scrollTo(0, 0);
            setModelFilter(e.target.value);
          }}
          label="Manufacturing Model"
        >
          <MenuItem value="">All Manufacturing Models</MenuItem>
          {models.map((model) => (
            <MenuItem key={model} value={model}>
              {capitalize(model?.replace(/_/g, " "))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Clear Filter Button */}
      {isAnyFilterActive() && (
        <div className="flex gap-2 items-center justify-end">
          <Button
            variant="contained"
            onClick={() => setMobileFilterOpen(false)}
            className="sm:!px-2 !px-2 sm:!hidden !flex !w-full sm:!text-base !text-sm sm:!text-white !text-black"
            sx={{
              backgroundColor: "#FFDE59",
              "&:hover": {
                backgroundColor: "#dd0000",
              },
            }}
          >
            Show&nbsp;Result
          </Button>
          <Button
            variant="contained"
            onClick={clearAllFilters}
            className="sm:!px-2 !px-4 sm:!w-fit !w-full sm:!text-base !text-sm"
            sx={{
              backgroundColor: "#fe0000",
              "&:hover": {
                backgroundColor: "#dd0000",
              },
            }}
          >
            Clear&nbsp;Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-[url(../../public/assets/images/RealSales-backgrounds/bg-15.png)] bg-center bg-repeat relative`}
    >
      <div className="bg-[#ffffff8a] relative">
        {loading && (
          <div className="bg-black/80 absolute w-full h-full flex items-center justify-center z-100">
            <RotateRightIcon className="animate-spin !text-5xl text-white mb-[20%]" />
          </div>
        )}
        <div className="page-container mx-auto lg:p-5 p-4 container flex flex-col items-center lg:gap-8 gap-4">
          <div className="sm:w-fit w-full flex items-center justify-between sm:py-4 py-8">
            <h1 className="sora-bold text-4xl">AI Personas</h1>

            {/* Filters */}
            <div className="shadow-md flex justify-end md:hidden bg-[#FFDE59] rounded-[6px] w-fit">
              <IconButton onClick={() => setMobileFilterOpen(true)}>
                <FilterListIcon className="!text-black" />
                <span className="ml-2 text-base !text-black">Filters</span>
              </IconButton>
            </div>
          </div>

          {/* Desktop filters */}
          <div className="w-full md:flex hidden">{filterSection}</div>

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            PaperProps={{ style: { width: "80vw", maxWidth: 320 } }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <IconButton onClick={() => setMobileFilterOpen(false)}>
                  <span className="material-icons">
                    <CloseIcon />
                  </span>
                </IconButton>
              </div>
              {filterSection}
            </div>
          </Drawer>

          <div className="w-full flex flex-wrap items-center justify-self-start gap-2">
            {filteredPersonas?.length ? (
              filteredPersonas.map((v, i) => (
                <PersonaCard v={v} key={v?.persona_id || i} />
              ))
            ) : (
              <p>No personas found.</p>
            )}
            {/* {filteredPersonas?.length ? (
              filteredPersonas.map((v, i) => (
                <PersonaCard v={v} key={v?.persona_id || i} />
              ))
            ) : (
              <p>No personas found.</p>
            )}
            {filteredPersonas?.length ? (
              filteredPersonas.map((v, i) => (
                <PersonaCard v={v} key={v?.persona_id || i} />
              ))
            ) : (
              <p>No personas found.</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persona;
