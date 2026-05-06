
export default function CallToAction() {
    return (
        <section className="py-24 bg-[#4F46E5] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-5xl font-black text-white mb-8">Ready to create your dream jersey?</h2>
                <p className="text-white/80 text-xl mb-12">
                    Join thousands of teams who trust EAY SPORTS for their custom sportswear needs.
                </p>
                <button className="bg-white text-[#4F46E5] px-9 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                    Get Started Now
                </button>
                <button className="bg-white text-[#4F46E5] px-9 mx-2 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                    Become to Dealer
                </button>
            </div>
        </section>
    )
}