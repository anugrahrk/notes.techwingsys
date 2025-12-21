export const Notioncontent = ({heading,description}:{heading:string,description:string}) => {
  return (
    <section className="py-10">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
         
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground text-left md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          </div>
          </div>
          </section>
  )
}
