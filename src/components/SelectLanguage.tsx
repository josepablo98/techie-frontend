import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSettings } from "../store/settings/settingsSlice";

export const SelectLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settings.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;

    // Efectos colaterales aquí
    localStorage.setItem("publicLanguage", selectedLanguage);
    document.documentElement.lang = selectedLanguage;

    // Actualiza solo el campo language del slice
    dispatch(setSettings({ language: selectedLanguage }));
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="border border-gray-300 rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="es">
        {language === "es" && "Español"}
        {language === "en" && "Spanish"}
        {!["es", "en"].includes(language) && "Español"}
      </option>
      <option value="en">
        {language === "es" && "Inglés"}
        {language === "en" && "English"}
        {!["es", "en"].includes(language) && "Inglés"}
      </option>
    </select>
  );
};
