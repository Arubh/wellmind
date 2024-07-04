import { Flipwords } from "../components/ui/flip-words";

export default function Page() {
  const words = ["clear", "strong", "calm", "happy"];
 
  return (
    <div className="h-[40rem] flex justify-center items-center px-4 bg-navyBlue">
      <div className="text-4xl mx-auto font-serif text-[white] dark:text-[white]">
        Nurture your
        <Flipwords words={words} /> <br />
        mind with us
      </div>
    </div>
  );
}
