import Image from 'next/image'
import Link from 'next/link'

export default function Thumbnail({ src, name ,id, }: { src: string, name: string, id: string }) {
    return (
        <Link href={`/watch/${id}`}>
        <div className="flex gap-4 p-2 w-64 h-26 ">
            <div className="flex flex-col items-center">
                <div className="relative  rounded-lg overflow-hidden">
                    <Image 
                        src={src}
                        alt="Video thumbnail 1"
                        width={160}
                        height={60}
                        className="object-cover w-full h-full"
                    />
                </div>
                <h3 className="mt-2 text-gray-200 font-medium">{name}</h3>
            </div>
        </div>
        </Link>
    )
}