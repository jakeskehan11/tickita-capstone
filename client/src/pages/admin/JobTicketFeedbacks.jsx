import React, { useState, useEffect } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IoCopy } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import { useFeedbacksContext } from "@/hooks/useFeedbacksContext";
import { useAuthContext } from "@/hooks/useAuthContext";

const JobTicketFeedbacks = () => {
  const { dispatch } = useFeedbacksContext();
  const { user } = useAuthContext();

  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [viewFeedback, setViewFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH FEEDBACKS
  useEffect(() => {
    const fetchJobTicketFeedbacks = async () => {
      const response = await fetch("/api/job-ticket/feedback/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setData(json);
        dispatch({ type: "SET_FEEDBACKS", payload: json });
      }
    };

    if (user) {
      fetchJobTicketFeedbacks();
    }
  }, [dispatch, user]);

  // FETCH SINGLE TICKET
  const fetchFeedbackDetails = async (ticketId) => {
    const response = await fetch(`/api/job-ticket/feedback/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setViewTicket(json);
      setIsModalOpen(true);
    } else {
      console.error("Failed to fetch the ticket details:", json.message);
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: `_id`,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Feedback ID
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-4 uppercase w-80">
          FEEDBACK-{row.getValue("_id")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="text-center" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-36 text-center">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="text-center" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-36 text-center">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "purposeOfVisit",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purpose of Visit
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-4 capitalize w-48 truncate">
          {row.getValue("purposeOfVisit")}
        </div>
      ),
    },
    {
      accessorKey: "attendingStaff",
      header: ({ column }) => (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Attending Staff
            <CaretSortIcon className="text-center" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center w-44">{row.getValue("attendingStaff")}</div>
      ),
    },
    {
      accessorKey: "courtesy",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Courtesy
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("courtesy")}</div>
      ),
    },
    {
      accessorKey: "quality",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quality
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("quality")}</div>
      ),
    },
    {
      accessorKey: "timeliness",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timeliness
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("timeliness")}</div>
      ),
    },
    {
      accessorKey: "efficiency",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Efficiency
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("efficiency")}</div>
      ),
    },
    {
      accessorKey: "cleanliness",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cleanliness
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("cleanliness")}</div>
      ),
    },
    {
      accessorKey: "comfort",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comfort
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("comfort")}</div>
      ),
    },
    {
      accessorKey: "comments",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-4 capitalize w-48 truncate">
          {row.getValue("comments")}
        </div>
      ),
    },
    {
      accessorKey: "feedbackDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Feedback Date
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("feedbackDate")}
        </div>
      ),
    },
    {
      accessorKey: "feedbackTime",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Feedback Time
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("feedbackTime")}
        </div>
      ),
    },
    {
      accessorKey: "jobTicket_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Ticket ID
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => {
        const jobTicketId = row.getValue("jobTicket_id");

        return (
          <div className="ml-4 uppercase w-72">
            {jobTicketId ? `TICKET-${jobTicketId}` : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "ticketType",
      header: ({ column }) => (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ticket Type
            <CaretSortIcon className="text-center" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-36 text-center">{row.getValue("ticketType")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const feedback = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(feedback._id)}
                className="cursor-pointer"
              >
                <IoCopy className="text-center size-5 mr-1" />
                Copy Feedback ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* VIEW SINGLE TICKET ACTION */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => fetchFeedbackDetails(row.getValue("_id"))}
              >
                <MdPreview className="text-center size-5 mr-1" />
                View Feedback
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.length ? data : [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="bg-slate-100">
      <div className="ml-72 pt-20 mr-12">
        <h1 className="font-bold text-3xl">Feedbacks</h1>
        <div className="flex items-center py-4 mt-6 justify-between">
          <Input
            placeholder="Filter Feedback ID..."
            value={table.getColumn("_id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-4">
                  View <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize cursor-pointer"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No feedback.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* VIEW TICKET MODAL */}
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl">
              {setViewFeedback ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="mb-4 font-bold text-xl">
                      Feedback Details
                    </DialogTitle>
                    <DialogDescription>
                      <div className="text-black text-base w-full">
                        <div className="my-1">
                          <span className="font-semibold">FEEDBACK ID:</span>{" "}
                          {viewFeedback._id}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">Name:</span>{" "}
                          {viewFeedback.name}
                        </div>
                        <div className="">
                          <span className="font-semibold">
                            Purpose Of Visit:
                          </span>{" "}
                          {viewFeedback.purposeOfVisit}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">
                            Attending Staff:
                          </span>{" "}
                          {viewFeedback.attendingStaff}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">
                            Date of Feedback:
                          </span>{" "}
                          {viewFeedback.feedbackDate}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">
                            Time of Feedback:
                          </span>{" "}
                          {viewFeedback.feedbackTime}
                        </div>
                        <Separator className="bg-gray-300 my-2" />
                        <span className="font-semibold">Area of Concern</span>
                        <div className="my-1">
                          <span className="font-semibold">A. Courtesy:</span>{" "}
                          {viewFeedback.courtesy}
                        </div>
                        <div className="flex-col flex">
                          <span className="font-semibold my-1 ">
                            B. Service
                          </span>
                          <div className="indent-4">
                            <span className="font-semibold">1. Quality: </span>
                            {viewFeedback.quality}
                          </div>
                          <div className="indent-4">
                            <span className="font-semibold">
                              2. Timeliness:
                            </span>{" "}
                            {viewFeedback.timeliness}
                          </div>
                          <div className="indent-4">
                            <span className="font-semibold">
                              3. Efficiency:
                            </span>{" "}
                            {viewFeedback.efficiency}
                          </div>
                        </div>
                        <div className="flex-col flex">
                          <span className="font-semibold my-1">
                            C. Physical condition of office/work space
                          </span>
                          <div className="indent-4">
                            <span className="font-semibold">
                              1. Cleanliness:{" "}
                            </span>
                            {viewFeedback.cleanliness}
                          </div>
                          <div className="indent-4">
                            <span className="font-semibold">2. Comfort:</span>{" "}
                            {viewFeedback.comfort}
                          </div>
                          <div className="mt-4">
                            <span className="font-semibold">
                              Comments/Suggestions:
                            </span>{" "}
                            <p className="whitespace-normal break-words max-w-[39rem] max-h-40 overflow-y-auto scrollbar-custom my-1">
                              {viewFeedback.comments}
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <Button className="bg-green-950 hover:bg-green-900">
                      Close
                    </Button>
                  </DialogClose>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </DialogContent>
          </Dialog>
        )}

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTicketFeedbacks;
