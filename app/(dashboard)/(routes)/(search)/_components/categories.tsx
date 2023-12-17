"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcBusinessman,
    FcGraduationCap,
    FcFilmReel,
    FcSportsMode,
    FcReadingEbook,
    FcGlobe,
    FcMusic,
    FcLike,
    FcBullish,
    FcBriefcase,
    FcBusinessContact,
    FcBusinesswoman,
    FcElectronics,
    FcFactory,
    FcFilm,
    FcHeadset,
    FcHome,
    FcLikePlaceholder,
    FcMultipleDevices,
    FcMultipleInputs,
    FcMultipleSmartphones,
    FcNoIdea,
    FcOrganization,
    FcPhoneAndroid,
    FcSupport,
    FcPositiveDynamic,
    FcReading,
    FcSalesPerformance,
    FcSettings,
    FcSurvey,
    FcTimeline,
    FcTodoList,
    FcWebcam,
} from "react-icons/fc"

import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Comupter Science": FcMultipleDevices,
    "Mathematics": FcPositiveDynamic,
    "Physics": FcSurvey,
    "Chemistry": FcSalesPerformance,
    "Biology": FcReading,
    "Geography": FcTimeline,
    "History": FcTodoList,
    "Economics": FcSettings,
    "Literature": FcWebcam,
    "Philosophy": FcGlobe,
    "Psychology": FcMultipleSmartphones,
    "Sociology": FcMultipleDevices,
    "Law": FcMultipleInputs,
    "Business": FcBusinessman,
    "Accounting": FcBusinesswoman,
    "Marketing": FcElectronics,
    "Finance": FcFactory,
    "Management": FcBriefcase,
    "Engineering": FcEngineering,
    "Architecture": FcHome,
    "Medicine": FcPhoneAndroid,
    "Nursing": FcHeadset,
    "Pharmacy": FcLike,
    "Dentistry": FcLikePlaceholder,
    "Agriculture": FcBullish,
    "Food Science": FcFilm,
    "Nutrition": FcFilmReel,
    "Veterinary Medicine": FcNoIdea,
    "Education": FcGraduationCap,
    "Languages": FcOrganization,
    "Art": FcMusic,
    "Music": FcMusic,
    "Sports": FcSportsMode,
    "Other": FcBusinessContact,
};
export const Categories =({
    items,
}: CategoriesProps) => {
    return(
        <div className=" flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((category)=>(
                <CategoryItem
                    key={category.id}
                    label={category.name}
                    icon={iconMap[category.name]}
                    value={category.id}
                />
            ))}

        </div>
    )
}
