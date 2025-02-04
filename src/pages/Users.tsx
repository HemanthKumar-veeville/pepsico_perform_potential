import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil, Search, UserCircle } from "lucide-react";
import axiosInstance from "@/api/axios";
import InstagramHeader from "@/components/InstagramHeader";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department_ids: string[];
}

const Users = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Fetch users
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users");
      return response?.data?.data;
    },
  });
  // Fetch departments
  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await axiosInstance.get("/departments");
      return response?.data?.data;
    },
  });

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditDepartments = (user: User) => {
    setEditingUserId(user.id);
    setSelectedDepartments(user.department_ids || []);
  };

  const handleSaveDepartments = async () => {
    if (!editingUserId) return;

    try {
      await axiosInstance.put(`/users/${editingUserId}`, {
        department_ids: selectedDepartments,
      });

      // Refetch both users and departments
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["departments"] }),
      ]);

      // Close sheet and reset state
      setIsSheetOpen(false);
      setEditingUserId(null);

      toast({
        title: "Success",
        description: "User departments updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user departments",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <InstagramHeader />

      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-instagram-text">
            Users
          </h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 bg-[#1A1A1A] border-none h-10 text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Users List */}
        <Accordion
          type="single"
          defaultValue={users[0]?.id}
          collapsible
          className="space-y-3 sm:space-y-4"
        >
          {filteredUsers.map((user) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              key={user.id}
            >
              <AccordionItem
                value={user.id}
                className="border border-[#262626] rounded-lg overflow-hidden bg-[#121212]"
              >
                <AccordionTrigger className="hover:bg-[#1A1A1A] px-4 sm:px-5 py-3 sm:py-4 transition-all duration-200">
                  <div className="flex items-center gap-3 sm:gap-4 w-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-story-gradient rounded-full flex items-center justify-center">
                      <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-base sm:text-lg text-instagram-text truncate">
                        {user.name}
                      </p>
                      <p className="text-xs sm:text-sm text-instagram-secondary truncate">
                        {user.email}
                      </p>
                      <p className="text-xs sm:text-sm text-instagram-secondary mt-0.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#262626] text-instagram-text">
                          {user.role}
                        </span>
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 sm:px-5 pt-3 pb-4">
                  <div className="bg-[#1A1A1A] rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h3 className="text-lg font-semibold text-instagram-text">
                        Departments
                      </h3>
                      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-3 gap-2 text-sm hover:bg-[#262626] transition-colors"
                            onClick={() => {
                              handleEditDepartments(user);
                              setIsSheetOpen(true);
                            }}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="bottom"
                          className="bg-[#121212] border-t border-[#262626]"
                        >
                          <SheetHeader className="mb-6">
                            <SheetTitle className="text-xl text-instagram-text">
                              Edit Departments
                            </SheetTitle>
                            <SheetDescription className="text-sm">
                              Select departments for {user.name}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="space-y-2">
                            {departments.map((dept) => (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.15 }}
                                key={dept.id}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1A1A1A] active:bg-[#262626] transition-colors"
                              >
                                <Checkbox
                                  id={dept.id}
                                  checked={selectedDepartments.includes(
                                    dept.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedDepartments([
                                        ...selectedDepartments,
                                        dept.id,
                                      ]);
                                    } else {
                                      setSelectedDepartments(
                                        selectedDepartments.filter(
                                          (id) => id !== dept.id
                                        )
                                      );
                                    }
                                  }}
                                  className="data-[state=checked]:bg-blue-600 h-4 w-4"
                                />
                                <label
                                  htmlFor={dept.id}
                                  className="text-sm text-instagram-text cursor-pointer select-none flex-1"
                                >
                                  {dept.name}
                                </label>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex gap-3 mt-6">
                            <Button
                              variant="outline"
                              className="flex-1 h-10"
                              onClick={() => setIsSheetOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveDepartments}
                              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700"
                            >
                              Save
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {user.department_ids?.length > 0 ? (
                        departments
                          .filter((dept) =>
                            user.department_ids?.includes(dept.id)
                          )
                          .map((dept) => (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              key={dept.id}
                              className="bg-[#262626] px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-instagram-text"
                            >
                              {dept.name}
                            </motion.div>
                          ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="bg-[#262626] px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-instagram-text"
                        >
                          External User
                        </motion.div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-instagram-secondary text-sm"
          >
            No users found matching your search.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Users;
