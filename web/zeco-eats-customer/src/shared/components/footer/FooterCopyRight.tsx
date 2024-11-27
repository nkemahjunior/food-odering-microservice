 
 
export default function FooterCopyRight() {
    const date = new Date();
    return (
      <div className="flex items-center justify-center bg-secondary py-4 text-sm text-white md:text-base">
        <p>Zeco Eats Copyright {date.getFullYear()}, All Rights Reserved.</p>
      </div>
    );
}