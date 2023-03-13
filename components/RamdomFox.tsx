import { useRef, useState, useEffect } from 'react'
import type { ImgHTMLAttributes } from 'react'


type LazyImageProps = { src: string, onLazyLoad: (node: HTMLImageElement) => void };

type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNative


export const RamdomFox = ({ src, onLazyLoad, ...imgProps }: Props):JSX.Element => {
	
   
  const node = useRef<HTMLImageElement>(null)

  const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

  const [isLazyLoaded, setIsLazyLoaded] = useState(false)

  useEffect(() => {
      
      if(isLazyLoaded) {
      	return
      }

  	  const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(!entry.isIntersecting || !node.current) {
      	    return
          }
          setCurrentSrc(src)
          observer.disconnect()
          setIsLazyLoaded(true)

          if(typeof onLazyLoad === "function") {
          	onLazyLoad(node.current)
          }
        })
      })
  
      if(node.current) {
  	    observer.observe(node.current)
      }
  
  return () => {
  	observer.disconnect()
  }

}, [src, onLazyLoad])


	return(
      <img 
        ref={node} 
        src={src} 
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        {...imgProps}
      />
	)
}