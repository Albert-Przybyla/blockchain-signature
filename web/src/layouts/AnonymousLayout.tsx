import AnimatedOutlet from "../components/routing/AnimatedOutlet";

const AnonymousLayout = () => {
  return (
    <main className="h-full flex flex-row md:items-center justify-between ps-20 pe-[12px] py-[30px] md:p-[25px] md:pl-[76px] overflow-scroll md:overflow-hidden ">
      <AnimatedOutlet />
    </main>
  );
};

export default AnonymousLayout;
