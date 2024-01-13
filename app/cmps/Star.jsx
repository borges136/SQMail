import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

export default function Star({starTitle , onToggleIsStarred ,isStarred}) {
    return (
        <span
              onClick={onToggleIsStarred}
              title={starTitle}
              className="star-span"
            >
              {isStarred ? (
                <MdOutlineStar size={20} className="text-clrStarred" />
              ) : (
                <MdOutlineStarBorder
                  size={20}
                  className="text-clrTxtSecondary hover:text-clrTxtTertiary"
                />
              )}
            </span>
    )
  }