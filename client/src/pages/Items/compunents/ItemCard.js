import VuiTypography from "components/VuiTypography";

export const LbItemCard = () => {
  return (
    <div className="flex-none w-[8rem] h-[14rem] p-1 m-1 text-white cursor-pointer rounded-lg border-2 border-zinc-600 hover:border-yellow-500 lb-transition text-base">
      <img
        src="/logo.png"
        alt="card"
        className="w-[7rem] h-[7rem] mx-auto rounded-md border border-zinc-400"
      />
      <div className="mx-auto mt-2 text-sm">
        <VuiTypography color='white' variant="button" fontWeight='regular'>15000</VuiTypography><br />
        <VuiTypography color='white' variant="button" fontWeight='regular'>Light Hammer</VuiTypography><br />
        <VuiTypography color='white' variant="button" fontWeight='regular'>Item Type</VuiTypography><br />
        <VuiTypography color='white' variant="button" fontWeight='regular'>5</VuiTypography><br />
      </div>
    </div>
  );
}
