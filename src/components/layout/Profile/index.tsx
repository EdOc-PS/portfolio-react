import Roadmap from "@/components/ui/Roadmap"
import RoadmapCard from "@/components/ui/RoadmapCard"
import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"
import { useState } from "react"

const Profile = () => {
    const [roadSelected, setRoadSelected] = useState<number>(0);
    const [visibleStart, setVisibleStart] = useState(0);

    const roadMocks = [
        {
            title: "Tecnico de Informática",
            description: "Tecnico em informatica concluido em 2023 no IFMG"
        },
        {
            title: "Sistemas de Informação",
            description: "Graduação em sistemas de informação em andamento no IFMG"
        },
        {
            title: "Tecnico de Informatica",
            description: "Atuei como estágiário em TI, com experiência em suporte técnico, manutenção de hardware e software, além de colaborar com a equipe para resolver problemas técnicos."
        }, {
            title: "Assessor de Marketing",
            description: "Atuei voluntariamnent na em empresa Júnior do IFMG, desenvolvi habilidades como trabalho em equipe, criação de conteúdo e suporte em TI."
        },
        {
            title: "Analista de Integração de Dados",
            description: "Atuei desenvolvendo e mantendo integrações de dados entre sistemas, garantindo a consistência e a qualidade, colaborando com equipes multidisciplinares para otimizar processos de integração."
        },
        {
            title: "Desenvolvedor Frontend",
            description: "Desenvolvimento de interfaces web modernas e responsivas."
        }]

    const visibleCount = 4;
    const maxStart = Math.max(0, roadMocks.length - visibleCount);

    const visibleRoads = roadMocks.slice(visibleStart, visibleStart + visibleCount);

    const handleShowNext = () => {
        setVisibleStart((prev) => Math.min(prev + 1, maxStart));
    };

    const handleShowPrev = () => {
        setVisibleStart((prev) => Math.max(prev - 1, 0));
    };

    const liquidGlassStyles = {
        background: "#FFFFFF1F",
        border: "1px solid #FFFFFF59",
        backdropFilter: "blur(16px)",
        boxShadow: "inset 0 1px 0 #FFFFFF73, 0 10px 24px #00000038"
    };



    return (
        <section id="profile" className="py-24 sm:py-32 lg:py-40 w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col">
                <Reveal className="relative w-full">
                    <div className="flex flex-col gap-2">
                        <div className="relative w-fit">
                            {/* Setas apontando para o título */}
                            <svg width="149" height="122" viewBox="0 0 149 122" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="absolute -top-28 left-0 w-20 sm:w-24 text-indigo-300 opacity-30 rotate-[210deg] pointer-events-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M137.863 0.579489C137.792 0.790681 137.722 1.35386 137.722 1.84664C137.722 2.33943 137.558 4.1463 137.346 5.88277C136.877 9.8485 137.041 15.8792 137.722 19.3287C137.98 20.6193 138.191 21.7222 138.191 21.7926C138.168 21.9804 137.182 20.7601 134.86 17.733C131.763 13.65 130.355 12.0778 127.54 9.59038C119.399 2.38636 111.869 -0.523407 104.408 0.696818C100.584 1.30693 94.9773 3.77085 91.4113 6.37556C83.6695 12.0778 77.734 22.9659 76.4672 33.8072C76.1856 36.1537 76.3029 43.0762 76.6548 46.2675L76.7956 47.6286L75.4115 46.995C68.2795 43.7332 64.6432 42.3722 59.482 41.0346C53.9688 39.6032 48.7372 39.087 43.529 39.439C25.3239 40.6592 10.0982 57.4842 3.55276 83.6252C2.49705 87.896 0.854832 96.0386 0.362167 99.5585C-0.623162 106.434 0.479469 115.609 2.73165 119.246C3.5293 120.514 4.46771 121.523 4.86653 121.523C5.33574 121.523 5.2419 121.077 4.32695 119.246C2.96625 116.477 2.49705 113.755 2.49705 108.499C2.47359 103.454 2.56743 102.891 4.37387 95.0061C7.16564 82.8743 9.32398 76.4916 13.3591 68.5601C16.5497 62.2713 19.5292 58.0709 23.7989 53.8235C29.0775 48.5672 34.661 45.4932 40.8545 44.4137C44.1155 43.8505 50.7078 44.0852 54.5788 44.883C60.655 46.1737 64.9717 47.7459 73.1827 51.7116C78.3674 54.2225 79.4701 54.5041 80.8073 53.6124C82.4495 52.5564 82.6372 51.1954 81.9803 45.6809C81.7692 43.9444 81.5815 40.5419 81.5815 37.9841C81.558 34.0653 81.6284 33.0797 82.0742 31.0382C83.4114 24.8432 86.0624 19.4226 90.0272 14.7294C93.7808 10.2709 99.9509 6.77447 105.37 6.04703C109.499 5.48385 114.168 6.98567 119.024 10.4821C121.769 12.4298 126.766 17.4514 129.088 20.6193L131.083 23.3179L130.215 23.4822C129.745 23.5526 127.235 23.7638 124.678 23.9046C119.306 24.2096 118.555 24.3739 117.429 25.336C115.575 26.9786 115.904 29.9822 118.086 31.0147C119.212 31.5544 123.012 32.0472 127.282 32.2349C129.229 32.3053 133.945 32.5869 137.769 32.8685C145.511 33.4317 145.98 33.3848 147.458 32.0941C149.288 30.475 149.194 28.4569 147.059 23.5291C146.214 21.5814 145.112 18.7421 144.643 17.1933C142.602 10.5994 139.974 2.59755 139.458 1.44773C138.895 0.180568 138.168 -0.218351 137.863 0.579489Z" fill="currentColor" />
                            </svg>

                            <svg width="72" height="90" viewBox="0 0 72 90" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="absolute -top-24 left-[42%] w-9 sm:w-11 text-indigo-300 opacity-25 rotate-[160deg] pointer-events-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M52.1634 0.734116C55.2566 1.10779 58.1505 2.85161 61.8914 6.60912C66.8696 11.6081 70.1663 17.7862 71.5572 24.7116C71.8479 26.1814 71.9309 27.1114 71.9807 30.0012C72.0513 33.2688 71.9392 34.6182 71.4576 36.2582C71.0756 37.5868 70.5898 38.4047 69.6847 39.2725C68.4765 40.4309 67.8993 40.6136 68.4349 39.6669C68.709 39.1729 69.0785 37.6325 69.3733 35.7973C69.6266 34.1532 69.6349 29.1334 69.3733 27.3606C68.8294 23.5615 67.8827 20.3272 66.1763 16.5447C64.4324 12.6336 62.045 9.52794 58.0841 6.00293C57.3201 5.31786 56.3112 4.51239 55.8586 4.19684C51.6568 1.40673 46.7865 1.46486 42.8588 4.37953C38.686 7.48518 35.4724 13.9954 33.5376 23.246C33.2968 24.4044 32.9231 26.4928 32.9231 26.6838C32.9231 26.7544 33.2469 27.0284 33.6497 27.29C35.4724 28.4691 37.6314 30.4164 38.8895 32.019C42.3066 36.3744 44.1999 41.6225 44.6026 47.8919C44.8434 51.5706 44.0587 54.2818 42.2235 56.117C41.0859 57.2546 40.2887 57.62 39.0182 57.5494C38.2833 57.5079 38.0715 57.458 37.4072 57.1176C36.4689 56.6443 35.2191 55.4942 34.4137 54.3773C32.5785 51.828 31.4907 48.3487 31.1087 43.8064C30.9592 42.0626 31.0381 32.92 31.2083 31.1679C31.2789 30.5326 31.3412 29.6981 31.3412 29.312L31.362 28.6061L30.6063 28.1619C23.5023 23.9186 19.1759 28.0415 18.6112 39.5714C18.5116 41.6267 18.6112 45.3385 18.7815 45.4797C18.823 45.5087 19.2548 45.8409 19.7281 46.2146C21.4927 47.5639 23.0455 49.5112 24.0337 51.6287C24.6482 52.92 24.9098 53.6756 25.2212 55.0541C25.6364 56.8892 25.4828 58.0974 24.6773 59.3472C23.9631 60.4474 22.5224 61.6058 21.8664 61.6058C21.3931 61.6058 20.8284 61.0495 20.1724 59.9534C18.6403 57.3542 17.6438 53.9372 17.0169 49.2081C16.9463 48.6642 16.938 48.6518 16.2405 48.1701C15.846 47.8961 15.0322 47.4352 14.426 47.1404C11.1792 45.5669 8.24791 45.3883 6.35461 46.6464C5.93941 46.9204 5.71936 47.182 5.34568 47.8172C4.03366 50.0427 3.03718 53.0196 2.56385 56.063C2.36041 57.4041 2.39362 61.9089 2.61367 63.1171C3.63091 68.5811 5.93941 74.0534 9.10321 78.5084C9.95022 79.7083 10.6561 80.5844 10.7059 80.5263C10.7349 80.4972 10.6768 80.0529 10.5855 79.5381C10.3447 78.2468 10.3239 75.8097 10.5564 75.3156C10.7682 74.8506 12.238 73.2977 12.6947 73.0486C13.2095 72.7746 13.3299 72.8784 13.4088 73.6216C13.4379 73.9745 13.5583 74.5807 13.6704 74.9627C13.9029 75.7598 13.9237 76.2207 13.7617 76.6774C13.6621 76.939 13.6912 77.1922 13.9237 78.2012C14.2475 79.6004 14.862 81.4355 15.3063 82.3116C15.4682 82.6438 15.8626 83.2998 16.1533 83.7523C16.5768 84.3959 16.7802 84.5993 17.0501 84.6907C17.5359 84.8526 17.9054 85.1764 17.9054 85.438C17.9054 86.0027 16.2239 87.9292 14.9409 88.8343C14.2641 89.3201 13.9444 89.428 13.824 89.2371C13.7534 89.1042 13.1472 88.8343 9.63051 87.3105C6.45425 85.9279 4.48207 85.0311 3.36104 84.4291C2.72579 84.0969 2.67596 84.0471 2.73409 83.8022C2.83373 83.3994 3.3984 82.6936 4.33674 81.7968C5.34567 80.821 5.89789 80.4972 6.30063 80.6384C6.56221 80.7297 6.50407 80.6093 5.67368 79.2558C2.75069 74.5184 0.915518 69.8018 0.188923 65.135C-0.0643478 63.4908 -0.0643397 59.6918 0.197235 58.0808C0.94459 53.385 2.78806 49.1915 5.25848 46.6007C6.3463 45.4631 7.23483 44.7946 8.43475 44.2341C9.84642 43.5781 10.5398 43.4286 12.1549 43.4286C13.6164 43.4286 14.5631 43.6113 15.9249 44.1137C16.7428 44.4251 16.7221 44.4251 16.6515 44.1926C16.5519 43.9019 16.7719 39.2642 16.9421 37.9729C17.5276 33.5387 18.9766 30.2711 21.4678 27.7841C23.2116 26.0485 24.8434 25.1725 26.7782 24.9234C28.1691 24.7531 29.8216 25.0936 31.171 25.8285C31.4824 25.9904 31.7564 26.1191 31.7647 26.1025C31.7855 26.0942 31.9349 25.3469 32.1093 24.4708C33.1764 18.9985 34.8621 14.3193 37.1498 10.4621C39.5704 6.40983 42.099 3.78164 45.1341 2.1956C47.4218 1.00814 49.9711 0.472539 52.1675 0.742416L52.1634 0.734116ZM32.4705 30.4247C32.0387 36.3329 31.9349 39.3431 32.0969 41.8965C32.4083 46.7626 33.2262 49.7188 35.0115 52.43C36.4315 54.5849 38.4867 55.9592 40.3012 55.9592C41.418 55.9592 41.7211 55.8388 41.9121 55.3239C42.456 53.8541 42.6263 52.5712 42.5557 50.3748C42.4934 48.3404 42.2318 46.6754 41.4886 43.7109C40.8243 41.0412 40.3178 39.6088 39.3628 37.6615C37.8307 34.5351 35.9167 32.1062 33.4462 30.1424C33.031 29.8102 32.6615 29.5486 32.62 29.5486C32.5702 29.5486 32.5079 29.9431 32.4705 30.4247ZM19.9108 52.6501C20.434 54.614 21.09 56.1087 21.9162 57.267C22.5224 58.1348 22.5515 57.9106 22.0283 56.3412C21.4636 54.6389 19.9316 51.5747 19.7406 51.7657C19.7115 51.7948 19.7904 52.1892 19.9108 52.6542V52.6501Z" fill="currentColor" />
                            </svg>

                            <svg width="236" height="66" viewBox="0 0 236 66" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="hidden sm:block absolute -top-24 right-0 w-32 text-indigo-300 opacity-20 rotate-[300deg] pointer-events-none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M23.9244 0.127533C18.3186 0.573079 9.85122 2.47255 4.6676 4.44233C1.59496 5.61482 0 7.46734 0 9.81232C0 11.2897 0.422197 12.298 1.43077 13.2594C2.39244 14.174 3.02573 14.4085 5.74654 14.9713C10.4611 15.9327 20.4765 20.4351 27.5365 24.7968C31.5708 27.2825 32.8374 27.8218 32.8374 27.0479C32.8374 26.6727 31.0313 24.5154 27.513 20.6931C26.3168 19.3799 25.3317 18.2308 25.3317 18.1605C25.3317 17.9963 26.7625 18.0901 34.362 18.7467C54.9088 20.5055 75.5964 24.7733 95.463 31.3861C103.156 33.9422 107.894 35.7244 116.221 39.1949C123.633 42.2669 125.322 42.8766 126.846 42.8766C127.925 42.8766 128.183 42.7828 128.957 42.0793C129.731 41.3523 129.825 41.1413 129.802 40.2033C129.778 39.0777 129.848 39.1949 127.034 35.7244C125.298 33.5904 124.078 31.4096 124.078 30.4247C124.078 29.4398 124.829 29.0412 126.893 29.0412C131.584 29.0412 140.802 32.5587 157.338 40.6723C166.72 45.2685 169.605 46.5816 170.708 46.7692C172.514 47.0506 173.944 46.1361 174.367 44.4477C174.46 44.049 174.226 42.0089 173.804 39.4294C173.053 34.974 173.03 33.8249 173.71 32.5117C174.179 31.6207 174.718 31.3861 176.313 31.3861C180.911 31.3861 190.762 36.0761 205.562 45.2919C214.85 51.0605 219.541 54.3435 227.845 60.886C230.542 63.0199 233.052 64.9194 233.427 65.107C234.318 65.5291 235.35 65.1539 235.726 64.2159C236.218 63.0434 235.515 62.1523 231.175 58.2596C224.537 52.3034 220.104 48.8328 212.974 44.0022C198.854 34.4112 187.22 28.1266 180.488 26.4617C171.599 24.234 166.908 28.9943 168.855 38.1632C169.136 39.4998 169.347 40.6019 169.3 40.6488C169.253 40.6957 167.424 39.7343 165.242 38.5149C159.59 35.3492 148.777 30.0261 144.367 28.2204C137.542 25.383 133.39 24.1167 129.567 23.6477C124.782 23.0615 120.889 24.703 119.716 27.7749C119.223 29.0881 119.364 31.5503 120.044 33.098C120.302 33.7077 120.49 34.2001 120.443 34.2001C120.396 34.2001 118.262 33.1683 115.681 31.902C90.4436 19.4267 60.1159 11.8525 28.9907 10.2579C22.7516 9.9296 22.9158 10.0468 26.6452 8.63983C29.366 7.63148 30.7264 6.0838 30.7264 4.06711C30.703 3.26982 29.882 1.72214 29.1315 1.089C28.4043 0.479303 26.5279 -0.0835156 25.4959 0.0102836C25.2144 0.0337334 24.5108 0.080633 23.9244 0.127533Z" fill="currentColor" />
                            </svg>

                            <h1 className="relative text-4xl font-garamond sm:text-5xl lg:text-6xl font-bold text-start">
                                Trajetória
                            </h1>
                        </div>
                        <p className="w-full max-w-lg text-sm sm:text-base">
                            Ao longo da minha trajetória, busquei constantemente aprimorar meus conhecimentos e habilidades, com ênfase em áreas essenciais para o desenvolvimento profissional na área de tecnologia.
                        </p>
                    </div>
                    <img
                        src="/doodledo-evo.png"
                        alt="Ilustração de evolução"
                        className="hidden sm:block absolute top-0 right-0 w-52 lg:w-72 select-none pointer-events-none"
                    />
                </Reveal>

                <Reveal delay={150} className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 py-4">
                    <div className="relative w-full lg:w-96 lg:shrink-0">
                        <div className="flex h-full flex-col justify-start gap-2 pr-12 transition-all duration-300 ease-out">
                            {visibleRoads.map((road, index) => {
                                const absoluteIndex = visibleStart + index;

                                return (
                                    <RoadmapCard
                                        key={absoluteIndex}
                                        setRoadSelected={setRoadSelected}
                                        roadSelected={roadSelected}
                                        index={absoluteIndex}
                                        title={road.title}
                                        description={road.description}
                                    />
                                );
                            })}
                        </div>

                        <div className="absolute top-0 right-0 flex flex-col gap-2">
                            {visibleStart > 0 && (
                                <button
                                    type="button"
                                    className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-out"
                                    style={liquidGlassStyles}
                                    onClick={handleShowPrev}
                                    aria-label="Mostrar card anterior"
                                >
                                    <Icon name="ArrowUp01Icon" size={20} color={"#d1cfc0"} />
                                </button>
                            )}

                            {visibleStart < maxStart && (
                                <button
                                    type="button"
                                    className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-out"
                                    style={liquidGlassStyles}
                                    onClick={handleShowNext}
                                    aria-label="Mostrar proximo card"
                                >
                                    <Icon name="ArrowDown01Icon" size={20} color={"#d1cfc0"} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-[14rem] sm:h-[20rem] md:h-[26rem] lg:h-[36rem]">
                        <Roadmap roadSelected={roadSelected} />
                    </div>
                </Reveal>
            </div>

        </section >
    )
}

export default Profile