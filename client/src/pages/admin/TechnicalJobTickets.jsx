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
import { IoCopy } from "react-icons/io5";
import { MdPreview, MdDelete } from "react-icons/md";
import { useTicketsContext } from "@/hooks/useTicketsContext";
import { useAuthContext } from "@/hooks/useAuthContext";

const TechnicalJobTickets = () => {
  const { dispatch } = useTicketsContext();
  const { user } = useAuthContext();

  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetchTechnicalJobTickets = async () => {
      const response = await fetch("/api/technical-job-ticket/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setData(json);
        dispatch({ type: "SET_TICKETS", payload: json });
      }
    };

    if (user) {
      fetchTechnicalJobTickets();
    }
  }, [dispatch, user]);

  const handleUpdateTicket = async (ticket, updatedStatus, updatedPriority) => {
    try {
      const response = await fetch(`/api/technical-job-ticket/${ticket._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status: updatedStatus,
          priority: updatedPriority,
        }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setData((prevData) =>
          prevData.map((item) =>
            item._id === updatedTicket._id ? updatedTicket : item
          )
        );
        dispatch({ type: "UPDATE_TICKET", payload: updatedTicket });
      } else {
        console.error("Failed to update the ticket:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  {/*UPDATE STATUS*/}
  const renderStatusDropdown = (row) => {
    const ticket = row.original;
    const currentStatus = ticket.status;

    const handleStatusUpdate = (updatedStatus) => {
      handleUpdateTicket(ticket, updatedStatus, ticket.priority);
    };

    const getBackgroundClass = (status) => {
      switch (status) {
        case "open":
          return "bg-green-950 hover:bg-green-900";
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

    return (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="capitalize p-0 h-0">
              <Badge className={getBackgroundClass(currentStatus)}>
                {currentStatus}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["open", "pending", "resolved"].map((status) => (
              <DropdownMenuItem
                key={status}
                className="cursor-pointer capitalize"
                onClick={() => handleStatusUpdate(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  {/*UPDATE PRIORITY*/}
  const renderPriorityDropdown = (row) => {
    const ticket = row.original;
    const currentPriority = ticket.priority;

    const handlePriorityUpdate = (updatedPriority) => {
      handleUpdateTicket(ticket, ticket.status, updatedPriority);
    };

    const getBackgroundClass = (priority) => {
      switch (priority) {
        case "low":
          return "bg-green-950 hover:bg-green-900";
        case "medium":
          return "bg-yellow-500 hover:bg-yellow-400";
        case "high":
          return "bg-red-600 hover:bg-red-500";
        default:
          return "";
      }
    };

    return (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="capitalize p-0 h-0">
              <Badge className={getBackgroundClass(currentPriority)}>
                {currentPriority}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Update Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["low", "medium", "high"].map((priority) => (
              <DropdownMenuItem
                key={priority}
                className="cursor-pointer capitalize"
                onClick={() => handlePriorityUpdate(priority)}
              >
                {priority}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
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
      accessorKey: "requesterName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requester Name
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("requesterName")}
        </div>
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
          className=""
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
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Status
          <CaretSortIcon className="text-center" />
        </Button>
      ),
      cell: ({ row }) => renderStatusDropdown(row),
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
      cell: ({ row }) => renderPriorityDropdown(row),
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

        const handleDeleteClick = async () => {
          try {
            if (!user) {
              return;
            }

            const response = await fetch(
              `/api/technical-job-ticket/${ticket._id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            const json = await response.json();

            if (response.ok) {
              dispatch({ type: "DELETE_TICKET", payload: json });
              setData((prevData) =>
                prevData.filter((item) => item._id !== ticket._id)
              );
            } else {
              console.error("Failed to delete the ticket:", json.message);
            }
          } catch (error) {
            console.error("Network error:", error);
          }
        };

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
              <DropdownMenuItem className="cursor-pointer">
                <MdPreview className="text-center size-5 mr-1" />
                View Ticket
              </DropdownMenuItem>

              {/* DELETE TICKET ACTION */}
              <AlertDialog>
                <AlertDialogTrigger className="text-sm hover:bg-slate-100 text-red-500 py-1.5 rounded-sm pl-2 px-20 flex">
                  <MdDelete className="text-center size-5 mr-1 text-red-500" />
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the ticket and remove the ticket data from servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteClick}
                      className="bg-red-400 text-white hover:bg-red-500"
                    >
                      Delete ticket
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
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
        <div className="flex items-center py-4 mt-6">
          <Input
            placeholder="Filter Ticket ID..."
            value={table.getColumn("_id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
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
              {table.getRowModel()?.rows?.length ? (
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

export default TechnicalJobTickets;
