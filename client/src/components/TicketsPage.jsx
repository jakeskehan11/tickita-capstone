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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useTicketsContext } from "@/hooks/useTicketsContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { IoCopy } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import CreateTicket from "@/components/CreateTicket";
import FeedbackForm from "@/components/FeedbackForm";

const UserTicket = () => {
  const { dispatch, tickets } = useTicketsContext();
  const { user } = useAuthContext();

  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [viewTicket, setViewTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // FETCH TICKETS
  useEffect(() => {
    const fetchTickets = async () => {
      const jobTicketResponse = await fetch("/api/job-ticket/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const technicalJobTicketResponse = await fetch(
        "/api/technical-job-ticket/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const jobTickets = await jobTicketResponse.json();
      const technicalJobTickets = await technicalJobTicketResponse.json();

      if (jobTicketResponse.ok && technicalJobTicketResponse.ok) {
        const allTickets = [
          ...jobTickets.map((ticket) => ({
            ...ticket,
            ticketType: "Job Ticket",
          })),
          ...technicalJobTickets.map((ticket) => ({
            ...ticket,
            ticketType: "Technical Job Ticket",
          })),
        ];
        const uniqueTickets = Array.from(
          new Set(allTickets.map((ticket) => ticket._id))
        ).map((id) => allTickets.find((ticket) => ticket._id === id));
        setData(uniqueTickets);
        dispatch({ type: "SET_TICKETS", payload: uniqueTickets });
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setData(tickets);
  }, [tickets]);

  // FETCH SINGLE TICKET
  const fetchTicketDetails = async (ticketId, ticketType) => {
    const endpoint =
      ticketType === "Technical Job Ticket"
        ? `/api/technical-job-ticket/${ticketId}`
        : `/api/job-ticket/${ticketId}`;
    const response = await fetch(endpoint, {
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

  // CLOSE TICKET STATUS
  const handleCloseTicket = async () => {
    try {
      const endpoint =
        viewTicket.ticketType === "Technical Job Ticket"
          ? `/api/technical-job-ticket/${viewTicket._id}`
          : `/api/job-ticket/${viewTicket._id}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: "closed" }),
      });

      if (response.ok) {
        const updatedTickets = tickets.map((ticket) =>
          ticket._id === viewTicket._id
            ? { ...ticket, status: "closed" }
            : ticket
        );
        dispatch({ type: "SET_TICKETS", payload: updatedTickets });

        setData(updatedTickets);

        setIsModalOpen(false);
        setIsFeedbackOpen(true);
      } else {
        console.error(
          "Failed to update the ticket status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "open":
        return "bg-green-900 hover:bg-green-800";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-400";
      case "resolved":
        return "bg-blue-600 hover:bg-blue-500";
      case "closed":
        return "bg-red-600 hover:bg-red-500";
      default:
        return "";
    }
  };

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-900 hover:bg-green-800";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-400";
      case "high":
        return "bg-red-600 hover:bg-red-500";
      default:
        return "";
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
          Ticket ID
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-4 uppercase w-72">TICKET-{row.getValue("_id")}</div>
      ),
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
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-4 capitalize w-48 truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center uppercase">
          {row.getValue("department")}
        </div>
      ),
    },
    {
      accessorKey: "building",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Building
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => {
        const building = row.getValue("building");

        return (
          <div className="text-center">{building ? `${building}` : "N/A"}</div>
        );
      },
    },
    {
      accessorKey: "room",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room #
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => {
        const room = row.getValue("room");

        return <div className="text-center">{room ? `${room}` : "N/A"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const colorClass = getStatusColorClass(status);
        return (
          <div className="flex justify-center capitalize">
            <Badge className={colorClass}>{status}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Priority
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority");
        const colorClass = getPriorityColorClass(priority);
        return (
          <div className="flex justify-center capitalize">
            <Badge className={colorClass}>{priority}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "requestDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Request Date
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("requestDate")}
        </div>
      ),
    },
    {
      accessorKey: "requestTime",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Request Time
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("requestTime")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const ticket = row.original;

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
                onClick={() => navigator.clipboard.writeText(ticket._id)}
                className="cursor-pointer"
              >
                <IoCopy className="text-center size-5 mr-1" />
                Copy Ticket ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* VIEW SINGLE TICKET ACTION */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  fetchTicketDetails(
                    row.getValue("_id"),
                    row.getValue("ticketType")
                  )
                }
              >
                <MdPreview className="text-center size-5 mr-1" />
                View Ticket
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
        <h1 className="font-bold text-3xl">Tickets</h1>
        <div className="flex items-center py-4 mt-6 justify-between">
          <Input
            placeholder="Filter Ticket ID..."
            value={table.getColumn("_id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center">
            <CreateTicket />
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
                    No ticket.
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
              {setViewTicket ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="mb-4 font-bold text-xl">
                      {viewTicket.ticketType === "Job Ticket"
                        ? "Job Ticket Details"
                        : "Technical Job Ticket Details"}
                    </DialogTitle>
                    <DialogDescription>
                      <div className="text-black text-base w-full">
                        <div className="my-1">
                          <span className="font-semibold">TICKET ID:</span>{" "}
                          {viewTicket._id}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">Requester Name:</span>{" "}
                          {viewTicket.requesterName}
                        </div>
                        <div className="mt-1 mb-3">
                          <span className="font-semibold">
                            {viewTicket.ticketType === "Job Ticket"
                              ? "Description of Work Requested:"
                              : "Description of Work Requested and Other Details:"}
                          </span>
                          <p className="whitespace-normal break-words max-w-[39rem] max-h-40 overflow-y-auto scrollbar-custom">
                            {viewTicket.description}
                          </p>
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">Department:</span>{" "}
                          {viewTicket.department}
                        </div>
                        <div className="my-1 capitalize">
                          <span className="font-semibold">Status:</span>{" "}
                          {viewTicket.status}
                        </div>
                        {viewTicket.ticketType === "Technical Job Ticket" && (
                          <>
                            <div className="my-1 capitalize">
                              <span className="font-semibold">Priority:</span>{" "}
                              {viewTicket.priority}
                            </div>
                          </>
                        )}
                        <div className="my-1">
                          <span className="font-semibold">Request Date:</span>{" "}
                          {viewTicket.requestDate}
                        </div>
                        <div className="my-1">
                          <span className="font-semibold">Request Time:</span>{" "}
                          {viewTicket.requestTime}
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500 hover:bg-red-600">
                          Close Ticket
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            close the ticket.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCloseTicket}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Close ticket
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogClose>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* FEEDBACK MODAL */}
        <FeedbackForm
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          ticketId={viewTicket ? viewTicket._id : null}
          ticketType={viewTicket ? viewTicket.ticketType : null}
        />

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

export default UserTicket;
