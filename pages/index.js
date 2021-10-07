function HomePage() {
  return (
    <>
      <div className="site-container">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            Ben Onur Aylanç. İstanbul'da yaşayan Frontend Developer'ım.
          </h1>
          <p className="">
            Tasarım araçları, front-end teknolojileri, sokak fotoğrafçılığı ve
            tipografi gibi konularla yakından ilgileniyorum.
          </p>
          <p className="">
            Sektördeki eski teknoloji ve alışkanlıkları yenilerle değiştirmek
            için youtube kanalımda modern türkçe içerikler üretiyorum.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-10">
        <img src="/js-return.jpg" />
      </div>
    </>
  )
}

export default HomePage
