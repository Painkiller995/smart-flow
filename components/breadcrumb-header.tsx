'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

const BreadcrumbHeader = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = '/' + paths.slice(0, index + 1).join('/');
            const isLast = index === paths.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className={`capitalize ${isLast ? 'font-bold' : ''}`} href={href}>
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
