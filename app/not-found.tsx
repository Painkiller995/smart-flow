import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Here we should write a description.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={"/"} className={buttonVariants()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">To do write</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
