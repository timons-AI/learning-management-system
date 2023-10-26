import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen, Divide } from "lucide-react";
import { formatPrice } from "@/lib/formats";

interface CourseCardProps {
    id: string;
    title: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string | null;
    imageUrl: string | null;
}

export const CourseCard = ({
    id,
    title,
    chaptersLength,
    price,
    progress,
    category,
    imageUrl,
}: CourseCardProps) => {

        return (
            <Link href={`/courses/${id}`}>
                <div className=" group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                    <div className=" relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                            fill 
                            className="object-cover"
                            alt={title}
                            src={imageUrl!}
                            />
                    </div>
                    <div className=" flex flex-col pt-2">
                        <div className=" text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                            {title}
                        </div>
                        <p className=" text-sm text-muted-foreground items-center">
                            {category}
                        </p>
                        <div className=" my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className=" flex items-center gap-x-1 text-slate-500">
                                <IconBadge  size="sm" icon={BookOpen}/>
                                    <span>
                                        {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                                    </span>
                            </div>
                        </div>
                        {progress !== null ? (
                            <div>
                                TODO: Progress component 
                            </div>
                        ) : (
                            <p className=" text-md md:text-sm font-medium text-slate-700">
                                {formatPrice(price)}
                            </p>
                        )}
                    
                    </div>
                </div>
                
            </Link>
    )
}