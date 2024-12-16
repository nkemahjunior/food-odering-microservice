 
 
export default function TellRestaurantAboutAllergy() {
    return (
      <textarea
        placeholder="Add a note here. Please contact the restaurant directly if you have an allergy"
        className={`h-[5rem] w-full resize-none text-wrap rounded-lg border-2 border-solid border-transparent bg-backgroundShade1 p-4 placeholder:text-storeTextColorTint focus:border-secondary focus:bg-white`}
      />
    );
}