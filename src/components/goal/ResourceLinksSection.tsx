import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ResourceLinksSectionProps {
  resourceLinks: string[];
  updateResourceLink: (index: number, value: string) => void;
  removeResourceLink: (index: number) => void;
  addResourceLink: () => void;
}

const ResourceLinksSection = ({
  resourceLinks,
  updateResourceLink,
  removeResourceLink,
  addResourceLink,
}: ResourceLinksSectionProps) => {
  return (
    <div>
      <Label>Resource Links</Label>
      {resourceLinks.map((link, index) => (
        <div key={index} className="flex gap-2 mt-2">
          <Input
            value={link}
            onChange={(e) => updateResourceLink(index, e.target.value)}
            placeholder="Enter a resource link"
            className="bg-[#E5DEFF]"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeResourceLink(index)}
            className="bg-[#FFDEE2] hover:bg-red-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={addResourceLink}
        variant="outline"
        size="sm"
        className="mt-2 bg-[#F2FCE2] hover:bg-[#E5DEFF]"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Resource Link
      </Button>
    </div>
  );
};

export default ResourceLinksSection;