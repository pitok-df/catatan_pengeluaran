import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddCategory() {
    return (
        <>
            <div className="mb-3 flex justify-end">
                <button className="btn btn-sm btn-circle w-max px-3 btn-outline">
                    <FontAwesomeIcon icon={faPlus} /> add category
                </button>
            </div>
        </>
    );
}