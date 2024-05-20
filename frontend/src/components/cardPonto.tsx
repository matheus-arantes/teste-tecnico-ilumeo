interface CardItemProps {
  date: Date;
  totalTime: Date;
}

export default function CardPonto({ date, totalTime }: CardItemProps) {
  const formattedDate = new Date(date);
  const formattedTotalTime = new Date(totalTime);
  console.log(`total: ${totalTime}`);
  // Função para adicionar um zero à esquerda para valores menores que 10
  const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

  // Formatar a data como DD/MM/YY
  const formattedDateString = `${addLeadingZero(formattedDate.getDate())}/${addLeadingZero(
    formattedDate.getMonth() + 1
  )}/${formattedDate.getFullYear().toString().slice(-2)}`;

  // Formatar o tempo final como HHh MMm
  const formattedTotalTimeString = `${formattedTotalTime.getUTCHours()}h ${addLeadingZero(
    formattedTotalTime.getMinutes()
  )}m`;
  console.log(`formattedTotalTimeString: ${formattedTotalTimeString}`);
  return (
    <section className="flex flex-row justify-between items-center rounded h-10 mb-2 pr-3 pl-3 bg-[#D9D9D90D]">
      <span className="font-montserrat font-medium text-xs text-[#CFCFCF]">
        {formattedDateString}
      </span>
      <span className="font-montserrat font-bold text-xs text-[#F5F5F5]">
        {formattedTotalTimeString}
      </span>
    </section>
  );
}
